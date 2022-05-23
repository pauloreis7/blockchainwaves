async function main() {
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')

  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log('contract deployed to:', waveContract.address)
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
