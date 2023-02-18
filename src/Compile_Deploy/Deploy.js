const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./Compile');
 
const provider = new HDWalletProvider(
  'dress pistol pear patrol cigar purchase retire ignore also key thing remind',
  'https://goerli.infura.io/v3/e02241dd0df3442aaa31c4fc84bdd9cc'
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();