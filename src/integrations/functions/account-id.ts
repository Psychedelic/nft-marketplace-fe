import crc32 from 'buffer-crc32';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { Principal } from '@dfinity/principal';

/* eslint-disable no-bitwise, no-prototype-builtins */
/* eslint-disable no-bitwise, no-prototype-builtins */

export const ACCOUNT_DOMAIN_SEPERATOR = '\x0Aaccount-id';

const byteArrayToWordArray = (
  byteArray: Uint8Array,
): CryptoJS.lib.WordArray => {
  const wordArray = [] as any;
  let i;
  for (i = 0; i < byteArray.length; i += 1) {
    wordArray[(i / 4) | 0] |= byteArray[i] << (24 - 8 * i);
  }
  // eslint-disable-next-line
  const result = CryptoJS.lib.WordArray.create(wordArray, byteArray.length);
  return result;
};

const wordToByteArray = (word: number, length: number): number[] => {
  const byteArray: number[] = [];
  const xFF = 0xff;
  if (length > 0) byteArray.push(word >>> 24);
  if (length > 1) byteArray.push((word >>> 16) & xFF);
  if (length > 2) byteArray.push((word >>> 8) & xFF);
  if (length > 3) byteArray.push(word & xFF);

  return byteArray;
};

const wordArrayToByteArray = (wordArray: any, length: number): Uint8Array => {
  if (
    wordArray.hasOwnProperty('sigBytes') && wordArray.hasOwnProperty('words')
  ) {
    length = wordArray.sigBytes;
    wordArray = wordArray.words;
  }

  let result: any = [];
  let bytes;
  let i = 0;
  while (length > 0) {
    bytes = wordToByteArray(wordArray[i], Math.min(4, length));
    length -= bytes.length;
    result = [...result, bytes];
    i += 1;
  }
  return [].concat(...result) as unknown as Uint8Array;
};

// eslint-disable-next-line
const intToHex = (val: number): string => val < 0 ? (Number(val) >>> 0).toString(16) : Number(val).toString(16);

// We generate a CRC32 checksum, and trnasform it into a hexString
const generateChecksum = (hash: Uint8Array): string => {
  const crc = crc32.unsigned(Buffer.from(hash));
  const hex = intToHex(crc);
  return hex.padStart(8, '0');
};

/*
    Used dfinity/keysmith/account/account.go as a base for the ID generation
*/
export const getAccountId = (
  principalId: string,
  subAccount?: number,
): string => {
  const principal = Principal.fromText(principalId);
  const sha = CryptoJS.algo.SHA224.create();
  sha.update(ACCOUNT_DOMAIN_SEPERATOR); // Internally parsed with UTF-8, like go does
  sha.update(byteArrayToWordArray(principal.toUint8Array()));

  const SUB_ACCOUNT_ZERO = Buffer.alloc(32);

  const subBuffer = Buffer.from(SUB_ACCOUNT_ZERO);
  if (subAccount) {
    subBuffer.writeUInt32BE(subAccount);
  }
  sha.update(byteArrayToWordArray(subBuffer));
  const hash = sha.finalize();

  /// While this is backed by an array of length 28, it's canonical representation
  /// is a hex string of length 64. The first 8 characters are the CRC-32 encoded
  /// hash of the following 56 characters of hex. Both, upper and lower case
  /// characters are valid in the input string and can even be mixed.
  /// [ic/rs/rosetta-api/ledger_canister/src/account_identifier.rs]
  const byteArray = wordArrayToByteArray(hash, 28);
  const checksum = generateChecksum(byteArray);
  const val = checksum + hash.toString();

  return val;
};

export const getICAccountLink = (principalId: string): string => `https://dashboard.internetcomputer.org/account/${getAccountId(principalId)}`;
