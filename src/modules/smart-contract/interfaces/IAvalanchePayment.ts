export interface IAvalanchePaymentReceivedEvent {
  from: string;
  packageId: string;
  tokenAddress: string;
  premiumAmount: number;
  lat: number;
  lon: number;
  startDate: number;
  tokenType: string;
  timestamp: number;
  txHash: string;
}
