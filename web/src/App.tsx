import { useState, useEffect } from "react";
import { Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { providers, Contract } from "ethers";

import { metamask } from "./services/walletConnectors";
import contractABI from "./utils/WavePortal.json";

import { Header } from "./components/Header";
import { SendWave } from "./components/SendWave";
import { Message } from "./components/Message";

const contractAddress = "0xD5617531733D19DD7CC1D6e28e1608C8278476E2";

type WaveProps = {
  waverAddress: string;
  message: string;
  timestamp: number;
};

export function App() {
  const { account, activate } = useWeb3React<Web3Provider>();

  const [allWaves, setAllWaves] = useState<WaveProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!account) {
      activate(metamask);
    }

    getAllWaves();
  }, []);

  async function getAllWaves() {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.log("not ethereum web :/");

      return;
    }

    setIsLoading(true);

    try {
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new Contract(
        contractAddress,
        contractABI.abi,
        signer
      );

      const waves = await wavePortalContract.getAllWaves();

      const formattedWaves = waves
        .map((wave: WaveProps) => ({
          waverAddress: `${wave.waverAddress?.substring(0, 6)}...
        ${wave.waverAddress?.substring(wave.waverAddress?.length - 3)}`,
          timestamp: new Date(wave.timestamp * 1000).toISOString(),
          message: wave.message,
        }))
        .reverse();

      setAllWaves(formattedWaves);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex
      as="main"
      w="100%"
      flexDirection="column"
      alignItems="center"
      p="14"
      pb=""
    >
      <Header />

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

      <SendWave getAllWaves={getAllWaves} />

      <Flex
        w="100%"
        maxWidth="52rem"
        flexDirection="column"
        alignItems="center"
        gap="8"
      >
        <Flex w="100%" alignItems="center" textAlign="left" mb="5">
          <Heading
            mr="6"
            textTransform="uppercase"
            fontSize="xl"
            fontWeight="600"
            color="blue.400"
          >
            all waves
          </Heading>

          {isLoading && (
            <>
              <Spinner size="sm" color="gray.500" mr="2" />

              <Text color="gray.500">Fetching</Text>
            </>
          )}
        </Flex>

        {allWaves.map((wave, i) => (
          <Message
            key={i}
            waverAddress={wave.waverAddress}
            timestamp={wave.timestamp}
            message={wave.message}
          />
        ))}
      </Flex>
    </Flex>
  );
}
