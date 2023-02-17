// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


interface IWiseNFT {

    function safeMint( string memory uri) external;


    function tokenURI(uint256 tokenId)
        external
        view
        returns (string memory);

    function supportsInterface(bytes4 interfaceId)
        external
        view
        returns (bool);
}