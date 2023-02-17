import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
// const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';

async function main() {

  // Uniswap Router Contract Address
  const UNISWAP_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const UniswapRouterContract = await ethers.getContractAt("IUniswapV2",UNISWAP_ADDRESS);

  // UNI Token
  // const UNIHolder = "0x7D2d43E63666f45B40316b44212325625DbAEB40";
  const UniTokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const UniTokenInterface = await ethers.getContractAt("IERC20", UniTokenAddress);
  

  // DAI Contract Address
  const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";
  const DAI_Contract = await ethers.getContractAt("IERC20",DAI_ADDRESS);

  // Impersonate an Account
  await impersonateAccount(DAIHolder);
  const DAI_Signer = await ethers.getSigner(DAIHolder);


  /** FIRST TEST */
  // Get the balance of the DAI Holder
  console.log(cyanBright(`######### 1ST == BEFORE ##############`));
  console.log(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`);
  console.log(`The UNI Holder Balance ${await UniTokenInterface.balanceOf(DAIHolder)}`);
  
  
  const paths = [DAI_ADDRESS, UniTokenAddress];
  let time = 1677588399;
  const amountToSwap = await ethers.utils.parseEther("100");
  
  // allow Uniswap to Spend

  await DAI_Contract.connect(DAI_Signer).approve(UNISWAP_ADDRESS, amountToSwap);
  
  await UniswapRouterContract.connect(DAI_Signer).swapExactTokensForTokens(
    amountToSwap,
    0,
    paths,
    DAIHolder,
    time
    )

    // Get the balance of the DAI Holder
    console.log(`######### AFTER ##############`);
    console.log(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`);
    console.log(`The ETH Balance ${await UniTokenInterface.balanceOf(DAIHolder)}`);

    /** SECOND TEST */
    const amountToSend = await ethers.utils.parseEther("0.1");
    const path2 = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", DAI_ADDRESS];
    // await DAI_Contract.connect(DAI_Signer).approve(UNISWAP_ADDRESS, amountToSend);

      // Get the balance of the DAI Holder
    console.log(cyan(`######### 2ND == BEFORE ##############`));
    console.log(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`);
    console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);

    await UniswapRouterContract.connect(DAI_Signer).swapETHForExactTokens(
      amountToSend,
      path2,
      DAIHolder,
      time,
      {
        value: amountToSend
      }
    );

      // Get the balance of the DAI Holder
      console.log(`######### AFTER ##############`);
      console.log(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`);
      console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);

      /** THIRD TEST */
      console.log(`\x1b[33m ######### 3RD == BEFORE ############## \x1b[0m`);
      console.log(red(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`));
      console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);
      
      await DAI_Contract.connect(DAI_Signer).approve(UNISWAP_ADDRESS, 1000000);
      await UniswapRouterContract.connect(DAI_Signer).swapTokensForExactETH(
        100,
        await ethers.utils.parseEther("0.1"),
        [ DAI_ADDRESS, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
        DAIHolder,
        time,
      );
  
        // Get the balance of the DAI Holder
        console.log(`\x1b [42m ######### AFTER ############## \x1b [0m`);
        console.log(`The DAI Holder Balance ${await DAI_Contract.balanceOf(DAIHolder)}`);
        console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);


  }

 


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
