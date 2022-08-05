import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

import useEventSource from "@/hooks/useEventSource";
import TradingChart from "@/components/trading/Chart";
import SwapInterface from "@/components/trading/Swap";
import { getData } from "src/utils";

import { defaults } from "src/constants";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Tooltip,
  PlacementWithLogical,
  Skeleton,
} from "@chakra-ui/react";

import {
  AiOutlineLineChart,
  AiOutlineDownload,
  AiOutlineUpload,
} from "react-icons/ai";

import { VscArrowSwap } from "react-icons/vsc";

const { NEXT_PUBLIC_URL } = process.env;

interface ReservesRecord {
  reserve0: string;
  reserve1: string;
  timestamp: number;
}

interface Props {
  updates: any;
  path: string[];
}

function Swap() {

  const bgColor = useColorModeValue("white", "#171e2b");

  const [tokenIn, setTokenIn] = useState(defaults.tokenIn);
  const [tokenOut, setTokenOut] = useState(defaults.tokenOut);

  const [path, setPath] = useState([]);

  const [pairs, setPairs] = useState([]);

  const [reservesUpdates, setReservesUpdates] = useState([]);

  const [tokens, setTokens] = useState([]);

  const handleStreamUpdates = (data: { pair: any; timestamp: number }) => {
    let updateIndex = reservesUpdates.findIndex(
      (update) => update.pair.address == data.pair
    );

    if (!reservesUpdates[updateIndex]) return;

    let { history } = reservesUpdates[updateIndex];

    if (history[history.length - 1].timestamp == data.timestamp) {
      reservesUpdates[updateIndex].history = [
        ...history.slice(0, history.length - 1),
        data,
      ];
    } else if (history[history.length - 1].timestamp == data.timestamp - 3600) {
      reservesUpdates[updateIndex].history = [
        ...history.slice(1, history.length),
        data,
      ];
    }
    setReservesUpdates([...reservesUpdates]);
  };

  useEventSource(
    pairs.map((pair) => ({
      url: `${NEXT_PUBLIC_URL}/stream/reserves?pair=${pair}`,
      callback: handleStreamUpdates,
    }))
  );

  useEffect(() => {
    (async () => {
      let { path } = await getData(
        `${NEXT_PUBLIC_URL}/api/path?tokenIn=${tokenIn}&tokenOut=${tokenOut}`
      );

      let { pairs } = await getData(
        `${NEXT_PUBLIC_URL}/api/pairs?path=${path.join(",")}`
      );

      let reservesUpdates = await getData(
        `${NEXT_PUBLIC_URL}/api/reserves?pairs=${pairs.join(",")}`
      );

      let tokens = await Promise.all(
        path.map((address: string) =>
          getData(`${NEXT_PUBLIC_URL}/api/token/${address}`)
        )
      );

      setPath(path);
      setPairs(pairs);
      setReservesUpdates(reservesUpdates);
      setTokens(tokens);
    })();
  }, [tokenIn, tokenOut]);

  return (
    <Layout>
      <Tabs orientation="vertical" variant="unstyled">
        <TabList marginTop="20px">
          <CustomTab tooltip={{ placement: "top", label: "Price Chart" }}>
            <AiOutlineLineChart size="25px" />
          </CustomTab>
          <CustomTab tooltip={{ placement: "top", label: "Liquidity Add" }}>
            <AiOutlineDownload size="25px" />
          </CustomTab>
          <CustomTab tooltip={{ placement: "top", label: "Liquidity Remove" }}>
            <AiOutlineUpload size="25px" />
          </CustomTab>
          <CustomTab tooltip={{ placement: "top", label: "Trades" }}>
            <VscArrowSwap size="25px" />
          </CustomTab>
        </TabList>
        <TabPanels
          borderWidth="1px"
          borderRadius="10px 10px 10px 10px"
          bgColor={bgColor}
        >
          <TabPanel height="500px" width="800px">
            <TradingChart
              reservesUpdates={reservesUpdates}
              path={path}
              setPath={setPath}
              tokens={tokens}
            />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SwapInterface />
    </Layout>
  );
}

export default Swap;

function CustomTab(props: {
  tooltip: { label: string; placement: PlacementWithLogical };
  children: any;
}) {
  const { tooltip, children } = props;

  return (
    <Tooltip label={tooltip.label} placement={tooltip.placement}>
      <Tab
        height="75px"
        _selected={{
          borderWidth: "1px 0px 1px 1px",
          borderRadius: "10px 0px 0px 10px",
          bgColor: "purple.700",
        }}
      >
        {children}
      </Tab>
    </Tooltip>
  );
}
