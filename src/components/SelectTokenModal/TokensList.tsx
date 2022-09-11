import {
  VStack,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface TokenItem {
  symbol: string;
  icon: string;
  name: string;
  address: string;
}

export default function TokensList({
  tokensList,
  onSelect = () => {},
}: {
  tokensList: TokenItem[];
  onSelect: (...params: any) => any;
}) {
  const handleClick = (tokenItem: TokenItem) => {
    onSelect(tokenItem);
  };

  return (
    <VStack spacing={2} align="stretch" width="100%">
      {tokensList.map((tokenItem) => (
        <TokenItem
          tokenItem={tokenItem}
          onClick={() => handleClick(tokenItem)}
        />
      ))}
    </VStack>
  );
}

function TokenItem({
  tokenItem,
  onClick = () => {},
}: {
  tokenItem: TokenItem;
  onClick: () => any;
}) {
  const { icon, symbol, name } = tokenItem;

  return (
    <Flex
      height="40px"
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="start"
      gap="0.5rem"
      padding="1.5rem"
      _hover={{ background: "rgba(0,0,0,0.25)" }}
      border="1px solid transparent"
      borderRadius="5px"
      onClick={onClick}
    >
      <Image boxSize="30px" borderRadius="50%" src={icon} />
      <Flex
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text alignSelf="start">{symbol}</Text>
        <Text fontSize="12px" color="gray.400">
          {name}
        </Text>
      </Flex>
    </Flex>
  );
}
