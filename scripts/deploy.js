const main = async () => {

  const DelegateContractFactory = await hre.ethers.getContractFactory('D31eg4t3');
  const DelegateContract = await DelegateContractFactory.deploy();
  await DelegateContract.deployed();
  console.log("Contract deployed to:", DelegateContract.address);

  const attackContractFactory = await hre.ethers.getContractFactory('Hack');
  const attackContract = await attackContractFactory.deploy();
  await attackContract.deployed();
  console.log("Contract deployed to:", attackContract.address);

};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();