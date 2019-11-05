'use strict';

const rootPrefix = '.',
  Web3 = require('web3'),
  OstWeb3 = require(rootPrefix + '/lib/web3/OstWeb3'),
  //OstWSProvider   = require( rootPrefix + '/lib/web3/OstWeb3ProvidersWs' ),
  Web3PoolFactory = require(rootPrefix + '/lib/web3Pool/ostWeb3PoolFactory'),
  Web3Pool = require(rootPrefix + '/lib/web3Pool/OstWeb3Pool');

module.exports = {
  Web3: Web3,
  OstWeb3: OstWeb3,
  OstWeb3Pool: {
    Factory: Web3PoolFactory,
    Pool: Web3Pool
  }
};
