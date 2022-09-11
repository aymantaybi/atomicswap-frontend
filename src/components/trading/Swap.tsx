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
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ArrowDownIcon } from "@chakra-ui/icons";

import { formatPrice } from "src/utils";
import SelectTokenModal, { TokenItem } from "../SelectTokenModal";
import { tokensList } from "src/constants";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function SwapInput(props: any) {
  const { value, onChange, tokenIn, tokenOut, setTokenIn, setTokenOut } = props;

  const bg = useColorModeValue("gray.200", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = tokenIn ?? tokenOut;
  const setToken = setTokenIn ?? setTokenOut;

  const tokenItem = tokensList.find(
    (tokenItem: TokenItem) => tokenItem.address == token
  );

  return (
    <VStack
      spacing={1}
      justifyContent="center"
      padding="1rem"
      borderRadius="lg"
      bg={bg}
    >
      <InputGroup>
        <InputLeftAddon
          borderRadius="lg"
          borderTopRightRadius="lg"
          borderBottomRightRadius="lg"
          _hover={{ opacity: "0.8" }}
          onClick={onOpen}
        >
          {tokenItem ? (
            <Image boxSize="30px" borderRadius="50%" src={tokenItem.icon} />
          ) : (
            <AiOutlineQuestionCircle />
          )}
        </InputLeftAddon>
        <SelectTokenModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          tokensList={tokensList}
          onSelect={(tokenItem: TokenItem) => {
            setToken(tokenItem.address);
          }}
        />
        <NumberInput variant="swap-input" value={value} onChange={onChange}>
          <NumberInputField borderLeftRadius={0} textAlign="right" bg={bg} />
        </NumberInput>
      </InputGroup>
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 13,
          fontWeight: 500,
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <div>Balance: 0</div>
        {tokenIn && (
          <Button
            colorScheme="purple"
            variant="outline"
            height="20px"
            width="20px"
            fontSize="11"
            marginLeft="0.5rem"
          >
            Max
          </Button>
        )}
      </div>
    </VStack>
  );
}

export default function SwapInterface({
  tokenIn,
  tokenOut,
  setTokenIn,
  setTokenOut,
}) {
  const bgColor = useColorModeValue("white", "#171e2b");

  return (
    <VStack
      spacing={4}
      alignSelf="center"
      borderWidth="1px"
      borderRadius="lg"
      padding="1.5rem"
      width="350px"
      bgColor={bgColor}
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Heading size="md">Swap</Heading>
        {/*  <SwapSettings  {...{ settings: swapInterfaceState.settings, handleChangeSlippage, handleChangeDeadline }} /> */}
      </Flex>
      <VStack spacing={5} justifyContent="center">
        <VStack spacing={5} justifyContent="center">
          <SwapInput
            tokenIn={tokenIn}
            setTokenIn={setTokenIn}
            value={formatPrice("0")}
            onChange={(value: string) => console.log(value)}
          />
          <IconButton icon={<ArrowDownIcon />} aria-label="" />
          <SwapInput
            tokenOut={tokenOut}
            setTokenOut={setTokenOut}
            value={formatPrice("0")}
          />
        </VStack>
        <Button bg="purple.700" size="md" onClick={() => {}}>
          Swap
        </Button>
      </VStack>
    </VStack>
  );
}
