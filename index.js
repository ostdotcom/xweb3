'use strict';

const Web3 = require('web3');

const rootPrefix = '.',
  OstWeb3 = require(rootPrefix + '/lib/web3/OstWeb3'),
  Web3Pool = require(rootPrefix + '/lib/web3Pool/OstWeb3Pool'),
  web3PoolFactory = require(rootPrefix + '/lib/web3Pool/ostWeb3PoolFactory');

module.exports = {
  Web3: Web3,
  OstWeb3: OstWeb3,
  ostWeb3Pool: {
    factory: web3PoolFactory,
    Pool: Web3Pool
  }
};
