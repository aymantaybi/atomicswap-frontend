import Atom from "@/components/Atom";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {

  const router = useRouter();

  useEffect(() => {

    router.push('/swap');

  }, []);

  return (
    <Flex height="100vh" width="100vw" display="flex" justifyContent="center" alignItems='center' bg="#44337A"  >
      <Atom />
    </Flex >
  )

}

export default Home;