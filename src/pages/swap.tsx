import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';

import useEventSource from '@/hooks/useEventSource';
import TradingChart from '@/components/trading/Chart';
import SwapInterface from '@/components/trading/Swap';
import { getData } from 'src/utils';

import { defaults } from 'src/constants';
import { Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue, Tooltip } from '@chakra-ui/react';

import { AiOutlineLineChart, AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";

import { VscArrowSwap } from "react-icons/vsc";

const { NEXT_PUBLIC_URL } = process.env;

interface ReservesRecord {
  reserve0: string,
  reserve1: string,
  timestamp: number
};

interface Props {
  updates: any,
  path: string[],
}

export async function getServerSideProps(context) {

  const { query } = context;

  const { tokenIn = defaults.tokenIn, tokenOut = defaults.tokenOut } = query;

  const { path } = await getData(`${NEXT_PUBLIC_URL}/api/path?tokenIn=${tokenIn}&tokenOut=${tokenOut}`);

  const { pairs } = await getData(`${NEXT_PUBLIC_URL}/api/pairs?path=${path.join(',')}`);

  const updates = await getData(`${NEXT_PUBLIC_URL}/api/reserves?pairs=${pairs.join(',')}`);

  const tokens = await Promise.all(path.map(address => getData(`${NEXT_PUBLIC_URL}/api/token/${address}`)));

  return { props: { updates, path, tokens } }
}

function Swap({ updates, path, tokens }) {

  const router = useRouter();

  const bgColor = useColorModeValue("white", "#171e2b");

  const [reservesUpdates, setReservesUpdates] = useState(updates);
  const [swapPath, setSwapPath] = useState(path);

  updates.map(update => {

    const pairAddress = update.pair.address;

    useEventSource(`${NEXT_PUBLIC_URL}/stream/reserves?pair=${pairAddress}`, async (data) => {

      var updateIndex = reservesUpdates.findIndex(update => update.pair.address == data.pair);

      if (!reservesUpdates[updateIndex]) return;

      var { history } = reservesUpdates[updateIndex];

      if (history[history.length - 1].timestamp == data.timestamp) {
        reservesUpdates[updateIndex].history = [...history.slice(0, history.length - 1), data];
      } else if (history[history.length - 1].timestamp == data.timestamp - 3600) {
        reservesUpdates[updateIndex].history = [...history.slice(1, history.length), data];
      }

      setReservesUpdates([...reservesUpdates]);

    });

  })

  const handleChangeToken = () => {

    router.push({
      query: {
        tokenIn: "0x0b7007c13325c48911f73a2dad5fa5dcbf808adc",
        tokenOut: "0xe514d9deb7966c8be0ca922de8a064264ea6bcd4"
      },
    })

  }

  return (
    <Layout>

      <Tabs orientation='vertical' variant='unstyled' >
        <TabList marginTop="20px" >
          <Tooltip label='Price Chart' placement='top'>
            <Tab height="75px" _selected={{ borderWidth: '1px 0px 1px 1px', borderRadius: '10px 0px 0px 10px', bgColor: "purple.400" }} onClick={handleChangeToken} >
              <AiOutlineLineChart size="25px" />
            </Tab>
          </Tooltip>
          <Tooltip label='Liquidity Add' placement='top'>
            <Tab height="75px" _selected={{ borderWidth: '1px 0px 1px 1px', borderRadius: '10px 0px 0px 10px', bgColor: "#1399ec" }} >
              <AiOutlineDownload size="25px" />
            </Tab>
          </Tooltip>
          <Tooltip label='Liquidity Remove' placement='top'>
            <Tab height="75px" _selected={{ borderWidth: '1px 0px 1px 1px', borderRadius: '10px 0px 0px 10px', bgColor: "#1399ec" }} >
              <AiOutlineUpload size="25px" />
            </Tab>
          </Tooltip>
          <Tooltip label='Swaps' placement='top'>
            <Tab height="75px" _selected={{ borderWidth: '1px 0px 1px 1px', borderRadius: '10px 0px 0px 10px', bgColor: "#1399ec" }} >
              <VscArrowSwap size="25px" />
            </Tab>
          </Tooltip>
        </TabList>
        <TabPanels borderWidth='1px' borderRadius='10px 10px 10px 10px' bgColor={bgColor} >
          <TabPanel height="500px" width="800px" >
            <TradingChart reservesUpdates={reservesUpdates} swapPath={swapPath} setSwapPath={setSwapPath} tokens={tokens} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SwapInterface />

    </Layout >
  )
}

export default Swap;
