export enum AssetCategoryEnum {
  Crypto = 'Crypto',
  Fiat = 'Fiat',
}

export enum FiatCurrencyEnum {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  //...
}

export enum CryptoCurrencyEnum {
  JFOX = 'JFOX',
  SOL = 'SOL',
  USDT = 'USDT',
  USDC = 'USDC',
  //...
}

export enum BlockchainNameEnum {
  ethereum = 'ethereum',
  solana = 'solana',
  //...
}

export const SPL_TOKENS: Partial<
  Record<CryptoCurrencyEnum, { mint: string; decimals: number }>
> = {
  [CryptoCurrencyEnum.USDT]: {
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
  },
  [CryptoCurrencyEnum.USDC]: {
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
  },
  [CryptoCurrencyEnum.JFOX]: {
    mint: 'CwrSEhcYGSN5x3GMtqhPdY3D39RbfpkmsKQcbsH7pump',
    decimals: 6,
  },
};
