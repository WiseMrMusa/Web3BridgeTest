import { ethers } from "hardhat";
import { green } from "console-log-colors"

// This function deploys the NFT Project on the blockchain
// It should be run once 
async function main() {
  const WiseNFT = await ethers.getContractFactory("WIseNFTCollectionProject");
  const deployWiseNFT = await WiseNFT.deploy("Wise Mr Musa NFT Collection", "WNC");
  const deployedWiseNFT = await deployWiseNFT.deployed();
  const deployedAddress = deployWiseNFT.address;
  console.log(green(`Wise Mr Musa NFT Collection has been deployed to ${deployWiseNFT.address}`))
  
  const WiseProject = await ethers.getContractAt("IWiseNFT", deployedAddress);

  const cid = "QmWZBhAzHgSHsxcHDP2gBxcjue9S8bEkUfiD2GLiB2nEVX";
    let uri = "ipfs://" + cid;

  console.log(await WiseProject.safeMint(uri))

}

// Deployed to 0xD23a40243C5cF26425EC46632972749625E24822
// -> 0x426Fb60927D39E97D93npxD9F54fDe8dBc2623dBB01


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});