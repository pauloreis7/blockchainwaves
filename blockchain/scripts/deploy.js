async function main() {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log("deploy contract with account:", deployer.address)
  console.log("account balance:", accountBalance.toString())

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')

  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001")
  })
  await waveContract.deployed()

  console.log('contract deployed to:', waveContract.address)
}

async function runDeployScript() {
  try {
    await main()

    process.exit(0)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}

runDeployScript()
