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
import { ethers, providers, Contract, BigNumber } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { abi } from '../contracts/SimpleStorage_json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Main = () => {
  const contractAddress = '0x8B9307bda85E7ae94A6D960904648626cC862A98';

  const [balance, setBalance] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contract, setContract] = useState<Contract | null>(null);
  const [tokenAddress, setTokenAddress] = useState<string>(
    '0xFEB18e332A18d95D937C70400291Ef299DB68589'
  );
  const [err, setErr] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState<string>('');

  useEffect(() => {
    if (!window.ethereum) return;

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // provider.getBalance('ethers.eth').then((result) => {
    //   setBalance(ethers.utils.formatEther(result));
    // });
  });

  function connect() {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
    window.ethereum.enable().then(() => {
      // const signer = provider.getSigner();
      provider.listAccounts().then((accounts) => {
        const signer = provider.getSigner(accounts[0]);
        setContract(new ethers.Contract(contractAddress, abi, signer));
        console.log(contract);
        setAddress(accounts[0]);
      });
      // signer.getAddress().then((result) => {
      //   setAddress(result);
      // });
      // signer = provider.getSigner(accounts[0]);
      // setContract(
      //   new ethers.Contract(
      //     contractAddress,
      //     abi,
      //     provider.getSigner(accounts[0])
      //   )
      // );
    });
  }

  return (
    <>
      <Typography variant='h5'> Airdrop </Typography>
      <Typography variant='body2'> {err} </Typography>

      <Box>
        <Button onClick={connect} size={'small'}>
          Connect
        </Button>
        <p>Connected Address: {address}</p>

        {!!address && (
          <>
            <TextField
              label='Check token Addresses'
              name='addresses'
              type='string'
              value={tokenAddress}
              size={'small'}
              onChange={(e) => {
                setTokenAddress(e.target.value);
              }}
              fullWidth
              required
              style={{ width: '50%' }}
            />
            <Button
              sx={{ display: 'inherit-inline' }}
              onClick={() => {
                console.log(tokenAddress);
                console.log();
                contract &&
                  contract
                    .checkBalance(tokenAddress)
                    .then((res: BigNumber) => {
                      console.log(res.toString());
                      setBalance(res.toString());
                      setErr('');
                    })
                    .catch((err: Error) => {
                      setErr(err.toString());
                    });
              }}
            >
              Check
            </Button>
            <Typography variant='body2' style={{ whiteSpace: 'pre-line' }}>
              {' '}
              {`The balance of this token in the smart contract: ${balance}`}
              {'\n'}
              <span>{`If the balance is 0, then send the tokens to this address ${contractAddress}`}</span>
            </Typography>
          </>
        )}
      </Box>

      {balance !== '' && balance !== '0' && (
        <>
          <Typography variant='body1'>
            {`The format is specific (without space). For example addresses field should be
            <0x40AF7d98e9F2844833bFdaA17ad4b7396143858b,
            0x2F9cc0C3AE27FD8151E71E36e01Bd123EE098B04>, while the amounts field
            should be <100000000000,10000000000000>`}
          </Typography>
          <AirdropForm
            contract={contract}
            tokenAddress={tokenAddress}
            account={address}
          />
        </>
      )}
    </>
  );
};

export default Main;
