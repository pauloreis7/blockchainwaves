import { Flex, Text, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { metamask } from "../services/walletConnectors";

export function Header() {
  const { account, activate } = useWeb3React<Web3Provider>();

  const formattedWallet = `${account?.substring(0, 6)}...
  ${account?.substring(account?.length - 3)}`;

  return (
    <Flex
      as="header"
      w="100%"
      mb="8"
      alignItems="center"
      justifyContent="flex-end"
    >
      {account ? (
        <Text fontSize="lg" color="gray.200">
          Account: {formattedWallet}
        </Text>
      ) : (
        <Button
          marginLeft="auto"
          colorScheme="blue"
          onClick={() => activate(metamask)}
        >
          Login wallet
        </Button>
      )}
    </Flex>
  );
}
