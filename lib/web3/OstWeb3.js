'use strict';
//This is a derived class of web3js

// Third Party Requires.
const Web3 = require('web3');

// Other Requires
const rootPrefix = '../..',
  OstWSProvider = require(rootPrefix + '/lib/web3/OstWeb3ProvidersWs'),
  Logger = require(rootPrefix + '/lib/logger/CustomConsoleLogger');

const logger = new Logger('OSTWeb3');

const OstWeb3 = (module.exports = function(provider, net, options) {
  let oThis = this;

  oThis.endPointUrl = provider;

  options = options || {};

  //If WS Provider, create one.
  var providerOptions = options.providerOptions || {};
  providerOptions = Object.assign({}, OstWeb3.DefaultOptions.providerOptions, providerOptions);
  oThis.providerOptions = providerOptions;
  if (providerOptions.autoReconnect && typeof provider === 'string' && /^ws(s)?:\/\//i.test(provider)) {
    provider = new OstWSProvider(provider, null, providerOptions);
  }

  oThis = Web3.call(oThis, provider, net) || oThis;
  providerOptions.providerPollingInterval = Number(providerOptions.providerPollingInterval);
  let providerPollingInterval = providerOptions.providerPollingInterval;
  if (provider instanceof OstWSProvider && !isNaN(providerPollingInterval) && providerPollingInterval > 0) {
    provider.onConnectionOpen = function() {
      oThis.providerHeartbeat();
    };
  }

  return oThis;
});

OstWeb3.OstWSProvider = OstWSProvider;

OstWeb3.DefaultOptions = {
  providerOptions: {
    autoReconnect: true,
    maxReconnectTries: 100,
    reconnectInterval: 500 /* Miliseconds */,
    killOnReconnectFailure: true,
    emitterMaxListeners: 100,
    providerPollingInterval: 30000
  }
};

let OSTWeb3Proto = {
  endPointUrl: null,

  providerHeartbeat: function() {
    const oThis = this;

    oThis.eth
      .getBlockNumber()
      .then(function(result) {
        logger.debug(`[${oThis.endPointUrl}] heartbeat successful. latest block number:: ${result}`);
      })
      .catch(function(reason) {
        logger.error(`[${oThis.endPointUrl}] WS ping failed. reason :: `, reason);
      })
      .then(function() {
        setTimeout(function() {
          oThis.providerHeartbeat();
        }, oThis.providerOptions.providerPollingInterval);
      });
  }
};

//Take care of prototype
OstWeb3.prototype = Object.create(Web3.prototype);
Object.assign(OstWeb3.prototype, OSTWeb3Proto);

//Take care of all static properties of Web3.
(function() {
  function addProp(prop) {
    Object.defineProperty(OstWeb3, prop, {
      get: function() {
        return Web3[prop];
      },
      set: function(newValue) {
        Web3[prop] = newValue;
      }
    });
  }
  for (var prop in Web3) {
    addProp(prop);
  }
})();
