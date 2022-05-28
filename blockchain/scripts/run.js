async function main() {
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  })

  await waveContract.deployed()
  console.log('deployed contract address:', waveContract.address)

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("contract balance:", hre.ethers.utils.formatEther(contractBalance))

  let addWaveTransaction = await waveContract.addWave("Im a wave! #1")
  await addWaveTransaction.wait()

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("contract balance:", hre.ethers.utils.formatEther(contractBalance))

  let allwaves = await waveContract.getAllWaves()
  console.log('allwaves', allwaves)
}

async function runMainScript() {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runMainScript()
