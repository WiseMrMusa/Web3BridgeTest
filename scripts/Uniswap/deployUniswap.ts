import { ethers } from "hardhat";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';

async function main() {

  // Uniswap Router Contract Address
  const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const UniswapRouterContract = await ethers.getContractAt("IUniswapV2",UNISWAP_ROUTER_ADDRESS);

  // UNI Token
  // const UNIHolder = "0x7D2d43E63666f45B40316b44212325625DbAEB40";
  const UNI_TOKEN_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const UNI_TOKEN_CONTRACT = await ethers.getContractAt("IERC20", UNI_TOKEN_ADDRESS);
  

  // DAI Contract Address
  const DAI_TOKEN_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";
  const DAI_TOKEN_CONTRACT = await ethers.getContractAt("IERC20",DAI_TOKEN_ADDRESS);

  // Impersonate an Account
  await impersonateAccount(DAIHolder);
  const DAI_Signer = await ethers.getSigner(DAIHolder);



  /** ADD LIQUIDITY */
  // console.log(green(`######### ADD LIQUIDITY ############`));

  // // Get the balance of the DAI Holder
  // console.log(`###### BEFORE ######`);
  // console.log(`The DAI Holder Balance ${await DAI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);
  // console.log(`The UNI Balance ${await UNI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);

  // await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,20000);
  // await DAI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,25000);
  // const  [ amountA, amountB, liquidity ] = await UniswapRouterContract.connect(DAI_Signer).addLiquidity(
  //   UNI_TOKEN_ADDRESS,
  //   DAI_TOKEN_ADDRESS,
  //   100,
  //   30,
  //   0,
  //   0,
  //   DAIHolder,
  //   1680307199
  //   ).then(e => e.wait().then(e => e.events[0].topics))

  //   // console.log(amountA, amountB, liquidity)

  //     // Get the balance of the DAI Holder
  // console.log(`######### AFTER ##############`);
  // console.log(`The DAI Holder Balance ${await DAI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);
  // console.log(`The UNI Balance ${await UNI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);

  /** ADD LIQUIDITY ETH */

  console.log(green(`######### ADD LIQUIDITY ETH ############`));

  console.log(`######### BEFORE ######`);
  console.log(`The DAI Holder Balance ${await UNI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);
  console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);

  // await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,1_000);
  await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,200_000);
  await UniswapRouterContract.connect(DAI_Signer).addLiquidityETH(
    UNI_TOKEN_ADDRESS,
    await ethers.utils.parseEther("10"),
    0,
    0,
    DAIHolder,
    1680307199
    ,{value: 10})

    console.log(`######### AFTER ######`);
    console.log(`The DAI Holder Balance ${await UNI_TOKEN_CONTRACT.balanceOf(DAIHolder)}`);
    console.log(`The ETH Balance ${await ethers.provider.getBalance(DAIHolder)}`);


  /** REMOVE LIQUIDITY */

  console.log(green(`######### REMOVE LIQUIDITY ############`));

  // // await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,1_000);
  // await DAI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,100_000);
  // console.log(await UniswapRouterContract.removeLiquidity(
  //   UNI_TOKEN_ADDRESS,
  //   DAI_TOKEN_ADDRESS,
  //   1_000,
  //   2_000,
  //   0,
  //   DAIHolder,
  //   1680307199
  //   ))


  }

 


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
