import { Button, ButtonGroup, Flex, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react"

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import Decimal from 'decimal.js';
import { formatHour, formatPrice } from 'src/utils';
import SwitchTokens from "../SwitchTokens";
import { useState } from "react";

interface ReservesRecord {
    reserve0: string,
    reserve1: string,
    timestamp: number
};

interface Pair {
    address: string,
    token0: string,
    token1: string,
    reserve0: string,
    reserve1: string,
}

interface Token {
    address: string,
    decimals: number,
}

function getAmountIn(amountOut: string | Decimal, reserveIn: string | Decimal, reserveOut: string | Decimal) {
    var numerator = new Decimal(reserveIn).times(amountOut).times('1000');
    var denominator = new Decimal(reserveOut).minus(amountOut).times('997');
    var amountIn = numerator.dividedBy(denominator);
    return amountIn;
};

function getAmountOut(amountIn: string | Decimal, reserveIn: string | Decimal, reserveOut: string | Decimal) {
    var amountInWithFee = new Decimal(amountIn).times('997');
    var numerator = new Decimal(amountInWithFee).times(reserveOut);
    var denominator = new Decimal(reserveIn).times('1000').plus(amountInWithFee);
    var amountOut = numerator.dividedBy(denominator);
    return amountOut;
};

function getReserves(tokenA: string, tokenB: string, pairs: Pair[],) {
    var pair = pairs.find(pair => [pair.token0, pair.token1].includes(tokenA) && [pair.token0, pair.token1].includes(tokenB));
    if (!pair) throw new Error(`No reserves found for tokens : ${[tokenA, tokenB]} `);

    var reserve0 = new Decimal(pair.reserve0);
    var reserve1 = new Decimal(pair.reserve1);

    var reserves: Decimal[] = [reserve0, reserve1];
    reserves = tokenA == pair.token0 ? reserves : [reserve1, reserve0];
    return reserves;
}

function getAmountsOut(amountIn: Decimal, path: string[], pairs: Pair[], tokens: Token[]) {
    var amounts = [];
    for (var i = 0; i < path.length - 1; i++) {
        var tokenIn = tokens.find(token => token.address == path[i]);
        var tokenOut = tokens.find(token => token.address == path[i + 1]);

        if (i == 0) {
            amounts[i] = amountIn.toDecimalPlaces(tokenIn.decimals, Decimal.ROUND_DOWN);
        }

        var [reserveIn, reserveOut]: Decimal[] = getReserves(tokenIn.address, tokenOut.address, pairs);
        amounts[i + 1] = getAmountOut(
            amounts[i],
            reserveIn.dividedBy(10 ** tokenIn.decimals),
            reserveOut.dividedBy(10 ** tokenOut.decimals)
        ).toDecimalPlaces(tokenOut.decimals, Decimal.ROUND_DOWN);
    }

    return [amounts[0], amounts[amounts.length - 1]].map(amount => amount.toNumber())
}

function getStats(data: number[]) {

    var first = data[0];
    var last = data[data.length - 1];

    var price = last;

    var variation = Number(((last / first - 1) * 100).toFixed(2));

    return {
        price,
        variation
    }

};

export default function TradingChart({ reservesUpdates, swapPath, setSwapPath, tokens }) {

    var series = [
        {
            name: "",
            data: reservesUpdates[0].history.map((_, index) => {

                var pairs = reservesUpdates.map(updates => {

                    var { address, token0, token1 } = updates.pair;

                    var { reserve0, reserve1 } = updates.history[index];

                    var pair: Pair = { address, token0, token1, reserve0, reserve1 };

                    return pair;

                });

                var [inQuantity, outQuantity] = getAmountsOut(new Decimal(1), swapPath, pairs, tokens);

                return outQuantity;
            })
        }
    ];

    var stats = getStats(series[0].data);

    var options = {
        colors: [stats.variation > 0 ? 'rgb(72, 187, 120)' : 'rgb(245, 101, 101)'],
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false,
            },
            foreColor: '#373d3f',
            background: 'rgba(0, 0, 0, 0)'
        },
        xaxis: {
            categories: reservesUpdates[0].history.map((update, index) => formatHour(update.timestamp)),
            labels: {
                show: true,
                rotate: 0,
                style: {
                    colors: "#fff",
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 800,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            axisBorder: {
                show: true,
                color: '#78909C',
                height: 1,
                width: '100%',
                offsetX: 0,
                offsetY: 0
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: {
            labels: {
                show: false,
                style: {
                    colors: "#fff",
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            strokeDashArray: 5,
            padding: {
                top: 0,
                right: 15,
                bottom: 15,
                left: 15
            },
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            fillSeriesColor: false,
            theme: "dark",
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: false,
                formatter: undefined,
            },
            y: {
                formatter: (value: number) => {
                    return formatPrice(value)
                }
            },
            z: {
                formatter: undefined
            },
            marker: {
                show: false,
            },
            items: {
                display: "flex",
            },
            fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        }
    }

    const handleSwitchTokens = () => {
        setSwapPath([...swapPath.reverse()]);
    }

    const pathTokens = swapPath.map(address => tokens.find(token => token.address == address));

    const pathTokensSymbol = pathTokens.map(token => token.symbol);

    const assetIn = pathTokensSymbol[0];
    const assetOut = pathTokensSymbol[pathTokensSymbol.length - 1];

    return (
        <Flex direction="column" padding="1.5rem" w="100%" h="100%" >
            <Flex direction="row" width="100%" flexDirection="row" justifyContent="start" gap="1rem" padding="0rem 1rem 0rem 1rem" >
                <SwitchTokens assetIn={assetIn} assetOut={assetOut} onClick={handleSwitchTokens} />
                <Stat>
                    <StatLabel>{pathTokensSymbol.join(' -> ')}</StatLabel>
                    <StatNumber>{formatPrice(stats.price)}</StatNumber>
                    <StatHelpText>
                        <StatArrow type={stats.variation > 0 ? 'increase' : 'decrease'} />
                        {stats.variation}%
                    </StatHelpText>
                </Stat>

                <ButtonGroup size='sm' isAttached variant='outline' colorScheme='purple' >
                    <Button bg='purple.100' color="purple.800" >1H</Button>
                    <Button>1D</Button>
                    <Button>1M</Button>
                </ButtonGroup>

            </Flex>
            <Chart
                options={options}
                series={series}
                type="area"
                height={"90%"}
            />
        </Flex >
    )
}
