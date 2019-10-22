# xweb3
Ethereum interaction layer using extended version of web3.
[![Build Status](https://travis-ci.org/ostdotcom/base.svg?branch=develop)](https://travis-ci.org/ostdotcom/base)
![npm version](https://img.shields.io/npm/v/@ostdotcom/base.svg?style=flat)

# Install

```bash
npm install @ostdotcom/xweb3 --save
```

# OSTWeb3 Usage
```js
const xweb3 = require('@ostdotcom/xweb3'), 
    wsEndPoint = "ws://127.0.0.1:8546",
    rpcEndPoint = "http://127.0.0.1:8545";

// The below instance of web3 uses OstWSProvider.
// OstWSProvider automatically tries to reconnect when connection is broken.
let wsWeb3 = new xweb3.OstWeb3( wsEndPoint );

// The below instance is same as new Web3( rpcEndPoint );
let rpcWeb3 = new xweb3.OstWeb3( rpcEndPoint );
```
