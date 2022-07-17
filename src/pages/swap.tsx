import { useState, useEffect } from 'react';
import Layout from '@/components/layout';

import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../features/counter';
import { Button } from '@chakra-ui/react';
import useEventSource from 'src/hooks/useEventSource';


function Swap() {

  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  const { NEXT_PUBLIC_URL } = process.env;

  var pairAddress = "0x306A28279d04a47468ed83d55088d0DCd1369294";

  useEventSource(`${NEXT_PUBLIC_URL}/stream/reserves?pair=${pairAddress}`, (data) => {
    console.log(data);
  });

  return (
    <Layout>
      <h2>{count}</h2>
      <Button
        colorScheme='blue'
        onClick={() => dispatch(increment())}
      >
        Button
      </Button>
    </Layout>
  )
}

export default Swap;