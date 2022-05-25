import { useEffect } from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { metamask } from "./services/walletConnectors";

export function App() {
  const { account, activate } = useWeb3React<Web3Provider>();

  const formattedWallet = `${account?.substring(0, 6)}...
  ${account?.substring(account?.length - 3)}`;

  useEffect(() => {
    if (!account) {
      activate(metamask);
    }
  }, []);

  return (
    <Flex w="100%" h="100vh" flexDirection="column" alignItems="center" p="14">
      <Flex w="100%" mb="5" alignItems="center" justifyContent="flex-end">
        {account ? (
          <Text fontSize="lg" color="gray.200">
            Account: {formattedWallet}
          </Text>
        ) : (
          <Button
            marginLeft="auto"
            colorScheme="blue"
            onClick={async () => await activate(metamask)}
          >
            Login wallet
          </Button>
        )}
      </Flex>

      <Heading
        textAlign="center"
        mb="4"
        textTransform="uppercase"
        fontSize="5xl"
        color="blue.500"
      >
        the waves portal
      </Heading>

      <Text textAlign="center" fontSize="2xl" color="gray.300" fontWeight="500">
        The amazing portal where you can wave to your friends by blockchain!
      </Text>
    </Flex>
  );
}
