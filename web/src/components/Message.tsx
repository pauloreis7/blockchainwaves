import { Flex, Text, Box } from "@chakra-ui/react";

type MessageProps = {
  waverAddress: string;
  message: string;
  timestamp: number;
};

export function Message({ waverAddress, timestamp, message }: MessageProps) {
  return (
    <Box w="100%" p="8" backgroundColor="gray.950" border="1px solid black">
      <Flex w="100%" alignItems="center" justifyContent="space-between" mb="8">
        <Text as="strong" fontSize="lg">
          {waverAddress}
        </Text>

        <Text color="gray.500">{timestamp}</Text>
      </Flex>

      <Text>{message}</Text>
    </Box>
  );
}
