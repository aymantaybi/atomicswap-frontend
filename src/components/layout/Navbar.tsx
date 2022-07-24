import * as React from "react";
import {
    Image,
    Heading,
    HStack,
    Button,
    Flex,
    ButtonGroup,
    useColorModeValue
} from "@chakra-ui/react";

import { useState } from "react";
import { DiAtom } from "react-icons/di";
import { VscArrowSwap } from "react-icons/vsc";
import { GiArchBridge } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";

import ConnectWallet from "../ConnectWallet";

import { useRouter } from 'next/router'
import Link from 'next/link';

function Address(props: any) {

    const { selectedAddress, disconnect } = props;

    return (
        <Button leftIcon={<Image boxSize='22px' src="/metamask.png" />} borderRadius="3xl" color="#171e2b" bgColor="#81E6D9" size='sm' variant='outline' marginRight="1px" _hover={{ bgColor: "#81E6D9", color: "#171e2b" }} onClick={disconnect} >
            {selectedAddress.substring(0, 7)}…{selectedAddress.substring(selectedAddress.length - 6)}
        </Button>
    );
}

function Navbar() {

    const router = useRouter();

    const color = useColorModeValue("#2a6d74", "#98b04f");

    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const disconnect = () => {
        setSelectedAddress(null);
    }

    return (
        <Flex w="100%" h="80px" display="flex" justifyContent="space-between" alignItems="center" position="sticky" top="0" padding="0px 15px 0px 15px" backgroundColor="gray.800" zIndex={"1000"} >
            <HStack spacing='2rem'>
                <HStack spacing='5px' marginLeft="2rem" >
                    <DiAtom color={"white"} size="45px" />
                    <Heading size="md" color={"white"} fontFamily="PT Sans" fontSize="25px" display={["none", "flex"]} flexDirection="row" >
                        Atomic
                    </Heading>
                    <Heading size="md" fontFamily="PT Sans" fontSize="25px" fontWeight={"90"} >
                        Swap
                    </Heading>
                </HStack>
                <ButtonGroup gap='1'>
                    <Link href="/swap" passHref>
                        <Button size="md" leftIcon={<VscArrowSwap size="25px" color="#D6BCFA" />} color="#D6BCFA" variant='ghost' backgroundColor='rgba(85, 60, 154, 0.15)' >
                            Swap
                        </Button>
                    </Link>
                    <Link href="/bridge" passHref>
                        <Button size="md" leftIcon={<GiArchBridge size="25px" color="#D6BCFA" />} color="#D6BCFA" variant='ghost'  >
                            Bridge
                        </Button>
                    </Link>
                </ButtonGroup>
            </HStack>
            <HStack spacing='1rem' marginRight="1rem" >
                {
                    selectedAddress ?
                        <Address {...{ selectedAddress, disconnect }} />
                        :
                        <>
                            <Button leftIcon={<IoWalletOutline size="20px" />} bg="purple.400" color="white" size='sm' variant='solid' marginRight="1px" onClick={openModal}>
                                Connect Wallet
                            </Button>
                            <ConnectWallet isOpen={isModalOpen} onOpen={() => { }} onClose={closeModal} />
                        </>

                }
            </HStack>
        </Flex >
    )

}

export default Navbar;