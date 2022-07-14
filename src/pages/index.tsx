import Atom from "@/components/Atom";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {

  const router = useRouter();

  useEffect(() => {

    setTimeout(() => {

      router.push('/swap')

    }, 1000)

  });

  return (
    <Flex height="100vh" width="100vw" display="flex" justifyContent="center" alignItems='center' bg="teal.400"  >
      <Atom />
    </Flex >
  )

}

export default Home;