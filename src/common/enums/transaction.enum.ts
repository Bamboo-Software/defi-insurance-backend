import { BlockchainNameEnum } from './currency.enum';

export enum PaymentProviderEnum {
  Metamask = 'metamask',
  Phantom = 'phantom',
}

export enum TransactionTypeEnum {
  INSURANCE_PURCHASE = 'insurance_purchase',
}

export enum TransactionStatusEnum {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  EXPIRED = 'Expired',
}

export enum PurchaseStatusEnum {
  AWAITING_PAYMENT = 'awaiting_payment',
  PAID = 'paid',
  PAYOUT_FAILED = 'payout_failed',
}

export enum PayoutStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  EXPIRED = 'expired',
  REJECTED = 'rejected',
}

export const NETWORK_MASTER_WALLETS: Partial<
  Record<BlockchainNameEnum, string>
> = {
  [BlockchainNameEnum.ethereum]: '0x0000000000000000000000000000000000000000',
};

export const blockchainToProviderMap: Record<
  BlockchainNameEnum,
  PaymentProviderEnum
> = {
  [BlockchainNameEnum.ethereum]: PaymentProviderEnum.Metamask,
  [BlockchainNameEnum.solana]: PaymentProviderEnum.Phantom,
  [BlockchainNameEnum.avalanche]: PaymentProviderEnum.Metamask,
};
