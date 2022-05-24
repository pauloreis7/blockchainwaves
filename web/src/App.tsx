import { Flex, Heading, Text } from "@chakra-ui/react";

export function App() {
  return (
    <Flex w="100%" h="100vh" flexDirection="column" alignItems="center" p="14">
      <Heading
        textAlign="center"
        mb="4"
        textTransform="uppercase"
        fontSize="5xl"
        color="blue.500"
      >
        the waves portal
      </Heading>

      <Text textAlign="center" fontSize="2xl" color="gray.400" fontWeight="500">
        The amazing portal where you can wave to your friends by blockchain!
      </Text>
    </Flex>
  );
}
