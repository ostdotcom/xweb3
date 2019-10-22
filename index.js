'use strict';

const rootPrefix = '.',
  Web3 = require('web3'),
  OstWeb3 = require(rootPrefix + '/lib/web3/ostWeb3'),
  //OstWSProvider   = require( rootPrefix + '/lib/web3/ostWeb3ProvidersWs' ),
  Web3PoolFactory = require(rootPrefix + '/lib/web3Pool/ostWeb3PoolFactory'),
  Web3Pool = require(rootPrefix + '/lib/web3Pool/ostWeb3Pool');

module.exports = {
  Web3: Web3,
  OstWeb3: OstWeb3,
  OstWeb3Pool: {
    Factory: Web3PoolFactory,
    Pool: Web3Pool
  }
};
