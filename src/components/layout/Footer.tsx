import React from 'react';
import { SimpleGrid, Flex, Box, VStack, Heading, Text, HStack } from '@chakra-ui/react';
import { DiAtom } from "react-icons/di";
import { BsDiscord, BsTwitter, BsGithub } from "react-icons/bs";

function Footer() {
    return (
        <Flex minWidth='max-content' height={["60vh", "60vh", "40vh"]} display="flex" justifyContent="center" alignItems='start' bg="teal.400" gap='2' padding={[null, null, '100px 5px 0px 5px']}  >
            <SimpleGrid width="100%" columns={[1, 1, 3]} spacing={10} >
                <VStack spacing={4} align='center' >
                    <Box h='100%'>
                        <DiAtom size="80px" />
                    </Box>
                    <Box h='100%'>
                        © 2022 Atomic Swap
                    </Box>
                </VStack>
                <HStack spacing={[5, 5, 10]} align='center' justify={["space-around", "space-around", "space-between"]} >
                    <VStack spacing={5} align='center' >
                        <Heading size="md" >Products</Heading>
                        <Text fontSize='lg'>Swap</Text>
                        <Text fontSize='lg'>Bridge</Text>
                    </VStack>
                    <VStack spacing={5} align='center' >
                        <Heading size="md" >About</Heading>
                        <Text fontSize='lg'>Terms of use</Text>
                        <Text fontSize='lg'>Docs</Text>
                    </VStack>
                </HStack>
                <HStack spacing={5} align='center' justify="center" >
                    <BsDiscord size="30px" />
                    <BsTwitter size="30px" />
                    <BsGithub size="30px" />
                </HStack>
            </SimpleGrid>
        </Flex >
    )
}

export default Footer