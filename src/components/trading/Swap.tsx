import {
    VStack,
    Image,
    NumberInput,
    NumberInputField,
    IconButton,
    InputGroup,
    InputLeftAddon,
    Button,
    Flex,
    useColorModeValue,
    Heading
} from "@chakra-ui/react"
import { useEffect } from "react";

import { ArrowDownIcon } from '@chakra-ui/icons'

import { formatPrice } from 'src/utils';

function SwapInput(props: any) {

    const { value, onChange, token, type } = props;

    const bg = useColorModeValue("gray.200", "gray.700");

    return (
        <VStack spacing={1} justifyContent="center" padding="1rem" borderRadius='lg' bg={bg}  >
            <InputGroup  >
                <InputLeftAddon borderRadius="lg" borderTopRightRadius="lg" borderBottomRightRadius="lg" >
                    <Image boxSize='30px' src={`https://assets.axieinfinity.com/explorer/images/contract-icon/${token}.png`} />
                </InputLeftAddon>
                <NumberInput variant="swap-input" value={value} onChange={onChange}    >
                    <NumberInputField borderLeftRadius={0} textAlign="right" bg={bg} />
                </NumberInput>
            </InputGroup>
            <div style={{ alignSelf: "flex-start", fontSize: 13, fontWeight: 500, display: "flex", flexDirection: "row", marginTop: 10 }} >
                <div >Balance: 0</div>
                {type == "input" &&
                    (<Button colorScheme='purple' variant='outline' height="20px" width="20px" fontSize="11" marginLeft="0.5rem" >
                        Max
                    </Button>)
                }
            </div>
        </VStack>
    )

}

export default function SwapInterface() {

    const bgColor = useColorModeValue("white", "#171e2b");

    return (
        <VStack spacing={4} alignSelf="center" borderWidth='1px' borderRadius='lg' padding="1.5rem" width="350px" bgColor={bgColor} >
            <Flex width="100%" justifyContent="space-between" alignItems="center" >
                <Heading size="md" >Swap</Heading>
                {/*  <SwapSettings  {...{ settings: swapInterfaceState.settings, handleChangeSlippage, handleChangeDeadline }} /> */}
            </Flex>
            <VStack spacing={5} justifyContent="center" >
                <VStack spacing={5} justifyContent="center" >
                    <SwapInput token="slp" value={"0"} onChange={(value: string) => console.log(value)} type="input" />
                    <IconButton icon={<ArrowDownIcon />} aria-label="" />
                    <SwapInput token="eth" value={formatPrice("0")} type="output" />
                </VStack>
                <Button bg='purple.700' size='md' >
                    Swap
                </Button>
            </VStack>
        </VStack >
    )
}