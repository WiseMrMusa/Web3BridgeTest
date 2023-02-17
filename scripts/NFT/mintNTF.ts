

import { ethers } from "hardhat";
import { green } from "console-log-colors"

// This function deploys the NFT Project on the blockchain
// It should be run once 
async function main() {

    const [owner] = await ethers.getSigners();
const cid = "QmWZBhAzHgSHsxcHDP2gBxcjue9S8bEkUfiD2GLiB2nEVX";
let uri = "ipfs://" + cid;
const NFT_ADDRESS = "0x426Fb60927D39E97D93npxD9F54fDe8dBc2623dBB01";


  const WiseNFTCollection = await ethers.getContractAt("IWiseNFT", "0x426Fb60927D39E97D93npxD9F54fDe8dBc2623dBB01");
  console.log(await WiseNFTCollection.safeMint(owner.address, uri));
}

// Deployed to 0xD23a40243C5cF26425EC46632972749625E24822
// -> 0x426Fb60927D39E97D93npxD9F54fDe8dBc2623dBB01


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});