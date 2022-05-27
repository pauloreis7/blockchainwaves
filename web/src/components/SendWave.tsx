import { useState } from "react";
import { Flex, Button, Input } from "@chakra-ui/react";
import { providers, Contract } from "ethers";

import contractABI from "../utils/WavePortal.json";

const contractAddress = "0xD5617531733D19DD7CC1D6e28e1608C8278476E2";

type SendWaveProps = {
  getAllWaves: () => Promise<void>;
};

export function SendWave({ getAllWaves }: SendWaveProps) {
  const [userWaveMessage, setUserWaveMessage] = useState("");

  async function handleWave() {
    const { ethereum } = window as any;

    if (!ethereum) {
      console.log("not ethereum web :/");

      return;
    }

    if (!userWaveMessage) {
      console.log("no message present :/");

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

      let totalWaves = await wavePortalContract.getTotalWavesCount();

      const sendWaveTransaction = await wavePortalContract.addWave(
        userWaveMessage
      );
      console.log("mining hash:", sendWaveTransaction.hash);

      sendWaveTransaction.wait();
      console.log("mined hash:", sendWaveTransaction.hash);

      totalWaves = await wavePortalContract.getTotalWavesCount();
      console.log("current waves count", totalWaves.toNumber());

      await getAllWaves();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Flex w="100%" maxWidth="52rem" alignItems="center" mb="12">
      <Input
        value={userWaveMessage}
        onChange={(event) => setUserWaveMessage(event.target.value)}
        mr="2"
        px="6"
        py="6"
        borderWidth="2px"
        bgColor="gray.950"
        variant="filled"
        borderColor="gray.950"
        _hover={{
          borderColor: "blue.500",
        }}
        _focus={{
          bgColor: "gray.950",
          borderColor: "blue.500",
        }}
        placeholder="Type wave here..."
      />

      <Button
        colorScheme="blue"
        fontSize="xl"
        px="12"
        py="6"
        onClick={handleWave}
      >
        Wave to me
      </Button>
    </Flex>
  );
}
