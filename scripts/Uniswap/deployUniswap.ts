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

  // await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,1_000);
  // await DAI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,2_000);
  // console.log(await UniswapRouterContract.addLiquidity(
  //   UNI_TOKEN_ADDRESS,
  //   DAI_TOKEN_ADDRESS,
  //   1_000,
  //   2_000,
  //   0,
  //   0,
  //   DAIHolder,
  //   1680307199
  //   ))

  /** ADD LIQUIDITY ETH */

  console.log(green(`######### ADD LIQUIDITY ETH ############`));

  // await UNI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,1_000);
  await DAI_TOKEN_CONTRACT.connect(DAI_Signer).approve(UNISWAP_ROUTER_ADDRESS,100_000);
  console.log(await UniswapRouterContract.addLiquidityETH(
    DAI_TOKEN_ADDRESS,
    10_000,
    0,
    await ethers.utils.parseEther("1000000"),
    DAIHolder,
    1680307199
    ))


  }

 


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
