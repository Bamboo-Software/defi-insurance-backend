// eslint-disable-next-line @typescript-eslint/no-require-imports
export const AGRICULTURAL_INSURANCE_DATA = require('../../data/jsons/agricultural-insurance.json');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI = require('../../data/jsons/avalanche-defi-insurance-contract.json');

export const USER_ACTIVATION_EXPIRATION =
  Number(process.env.USER_ACTIVATION_EXPIRATION) || 6; // Email verification expiration - 6 hours
export const MAX_FAILED_VERIFY_ATTEMPTS =
  Number(process.env.MAX_FAILED_VERIFY_ATTEMPTS) || 3; // maximum number of failed verify attempts
export const MAX_FAILED_LOGIN_ATTEMPTS =
  Number(process.env.MAX_FAILED_LOGIN_ATTEMPTS) || 5; // maximum number of failed verify attempts
export const LOCK_TIME_AFTER_FAILED_ATTEMPTS =
  Number(process.env.LOCK_TIME_AFTER_FAILED_ATTEMPTS) || 5; // 5 minutes to lock user after failed attempts
export const RESEND_VERIFICATION_CODE_DELAY_MINUTES =
  Number(process.env.RESEND_VERIFICATION_CODE_DELAY_MINUTES) || 1; // delay resend verification code in every minute;
export const FORGOT_PASSWORD_EXPIRATION =
  Number(process.env.FORGOT_PASSWORD_EXPIRATION) || 15; // forgot password expired in 15 minutes
export const TOP_RANK_THRESHOLD = Number(process.env.TOP_RANK_THRESHOLD) || 100;
export const SOLANA_TRANSACTION_FEE_MIN_BALANCE =
  Number(process.env.SOLANA_TRANSACTION_FEE_MIN_BALANCE) || 1000000;

// Smart Contract Abi
export const AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI_DATA =
  AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI;
