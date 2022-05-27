async function main() {
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log('deployed contract address:', waveContract.address)

  let wavesCount
  wavesCount = await waveContract.getTotalWavesCount()
  console.log('wavesCount', wavesCount.toNumber())

  let addWaveTransaction = await waveContract.addWave("Ex message!")
  await addWaveTransaction.wait()

  const [_, randomPerson] = await hre.ethers.getSigners()

  addWaveTransaction = await waveContract.connect(randomPerson).addWave("Ex message2!")
  await addWaveTransaction.wait()

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
