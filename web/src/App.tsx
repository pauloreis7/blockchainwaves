import { useEffect } from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { providers, Contract } from "ethers";

import { metamask } from "./services/walletConnectors";
import contractABI from "./utils/WavePortal.json";

const contractAddress = "0x6eb0612df7B2E813D60Bf6FB3863892307224C4A";

export function App() {
  const { account, activate } = useWeb3React<Web3Provider>();

  const formattedWallet = `${account?.substring(0, 6)}...
  ${account?.substring(account?.length - 3)}`;

  useEffect(() => {
    if (!account) {
      activate(metamask);
    }
  }, []);

  async function handleWave() {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.log("not ethereum web :/");

      return;
    }

    try {
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const wavePortalContract = new Contract(
        contractAddress,
        contractABI.abi,
        signer
      );

      let totalWaves = await wavePortalContract.getTotalWaves();

      const sendWaveTransaction = await wavePortalContract.addWave();
      console.log("mining hash:", sendWaveTransaction.hash);

      sendWaveTransaction.wait();
      console.log("mined hash:", sendWaveTransaction.hash);

      totalWaves = await wavePortalContract.getTotalWaves();
      console.log("current waves count", totalWaves.toNumber());
    } catch (err) {
      console.log(err);
    }
  }

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

      <Text
        textAlign="center"
        mb="14"
        fontSize="2xl"
        color="gray.300"
        fontWeight="500"
      >
        The amazing portal where you can wave to your friends by blockchain!
      </Text>

      <Button
        colorScheme="blue"
        fontSize="2xl"
        px="14"
        py="6"
        onClick={handleWave}
      >
        Wave to me
      </Button>
    </Flex>
  );
}
