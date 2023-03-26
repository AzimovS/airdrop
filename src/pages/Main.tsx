import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import AirdropForm from '../components/form/AirdropForm';
import { ethers, providers, Contract } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { abi } from '../contracts/SimpleStorage_json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Main = () => {
  // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
  const contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

  const [balance, setBalance] = useState<String | undefined>();
  const [address, setAddress] = useState<String | undefined>();
  const [contract, setContract] = useState<Contract | null>(null);
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState<string>('');

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance('ethers.eth').then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
  });

  function connect() {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.enable().then(() => {
      const signer = provider.getSigner();
      signer.getAddress().then((result) => {
        setAddress(result);
      });
      // signer = provider.getSigner(accounts[0]);
      setContract(new ethers.Contract(contractAddress, abi, provider));
    });
  }

  return (
    <>
      <Typography variant='h5'> Airdrop </Typography>
      <Box>
        <Button onClick={connect} size={'small'}>
          Connect
        </Button>
        <p>Connected Address: {address}</p>

        <TextField
          label='Addresses'
          name='addresses'
          type='string'
          value={tokenAddress}
          size={'small'}
          onChange={(e) => {
            setTokenAddress(e.target.value);
          }}
          required
        />
        <Button sx={{display:'inherit-inline'}}>Check</Button>
      </Box>

      <Typography variant='body1'>
        {' '}
        The format should be the same as in the Remix. For example addresses
        field should be ["0x40AF7d98e9F2844833bFdaA17ad4b7396143858b",
        "0x40AF7d98e9F2844833bFdaA17ad4b7396143858b"], while the amounts field
        should be ["100000000000000000000", "100000000000000000000"]{' '}
      </Typography>
      <AirdropForm />
    </>
  );
};

export default Main;
