export interface IProcessPayout {
  user: string;
  claimId: string;
  amount: string;
  tokenType: string;
  txHash?: string;
}
