import assert from 'assert';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
const web3Utils = new Web3().utils;

export function stringToBytes(str) {
  assert(!!str, 'argument is falsy');
  assert(typeof str === 'string', 'argument is not a string');
  return '0x' + Buffer.from(str).toString('hex');
}

export function bytesToString(hex) {
  return Buffer.from(hex.replace(/^0x/, ''), 'hex')
    .toString()
    .replace(/\x00/g, ''); // eslint-disable-line no-control-regex
}

export function castAsCurrency(value, currency) {
  if (currency.isInstance(value)) return value;
  if (typeof value === 'string' || typeof value === 'number')
    return currency(value);

  throw new Error(`Can't cast ${value} as ${currency.symbol}`);
}

export function parseWeiNumeric(value, denom = 'ether') {
  // fromWei will throw if passing a Bignumber value or string value that results
  // in being an exponent representation of a number when parsed as a number, e.g 1e18.
  // Passing value as a hex value seems to get around this
  return web3Utils.fromWei(BigNumber(value).toString(16), denom);
}

export function numberFromNumeric(value) {
  return BigNumber(value).toNumber();
}
