async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')

  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log('contract deployed to:', waveContract.address)
  console.log('contract deployed by:', owner.address)

  let wavesCount

  wavesCount = await waveContract.getTotalWaves()

  let addWave = await waveContract.addWave()
  await addWave.wait()

  wavesCount = await waveContract.getTotalWaves()

  addWave = await waveContract.connect(randomPerson).addWave()
  await addWave.wait()

  wavesCount = await waveContract.getTotalWaves()
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
