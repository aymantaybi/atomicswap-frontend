import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import TokensList, { TokenItem } from "./TokensList";

export default function SelectTokenModal(props) {
  const { isOpen, onOpen, onClose, tokensList, onSelect } = props;

  const [filteredTokenList, setFilteredTokenList] = useState(tokensList);

  const handleInputChange = (event) => {
    let inputValue = event.target.value.toLowerCase();
    let filtered = tokensList.filter(
      (tokenItem) =>
        tokenItem.symbol.toLowerCase().includes(inputValue) ||
        tokenItem.name.toLowerCase().includes(inputValue)
    );
    setFilteredTokenList(filtered);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          minHeight="350px"
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          gap="1rem"
          paddingBottom="2rem"
        >
          <InputGroup background="rgba(0,0,0,0.1)">
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch color="gray.300" />}
            />
            <Input placeholder="Search name" onChange={handleInputChange} />
          </InputGroup>
          <TokensList
            tokensList={filteredTokenList}
            onSelect={(tokenItem: TokenItem) => {
              onSelect(tokenItem);
              onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
