export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_addressArray',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_amountArray',
        type: 'uint256[]',
      },
    ],
    name: 'airdropWithTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];