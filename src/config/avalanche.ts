// Avalanche Network Configuration
export const avalancheConfig = {
  // Master wallet configuration
  masterWalletAddress: process.env.AVALANCHE_MASTER_WALLET_ADDRESS,
  masterWalletPrivateKey: process.env.AVALANCHE_MASTER_WALLET_PRIVATE_KEY,

  // Network configurations
  networks: {
    fuji: {
      name: 'fuji',
      chainId: 43113,
      rpcHttps: process.env.AVALANCHE_FUJI_HTTPS_ENDPOINT,
      rpcWss: process.env.AVALANCHE_FUJI_WSS_ENDPOINT,
      isTestnet: true,
    },
    mainnet: {
      name: 'mainnet',
      chainId: 43114,
      rpcHttps: process.env.AVALANCHE_MAINNET_HTTPS_ENDPOINT,
      rpcWss: process.env.AVALANCHE_MAINNET_WSS_ENDPOINT,
      isTestnet: false,
    },
  },

  getNetwork() {
    const network = process.env.AVALANCHE_NETWORK || 'mainnet';
    return this.networks[network] || this.networks.mainnet;
  },

  getHttpsEndpoint() {
    const network = process.env.AVALANCHE_NETWORK || 'mainnet';
    const networkConfig = this.networks[network] || this.networks.mainnet;
    return networkConfig.rpcHttps;
  },

  getWssEndpoint() {
    const network = process.env.AVALANCHE_NETWORK || 'mainnet';
    const networkConfig = this.networks[network] || this.networks.mainnet;
    return networkConfig.rpcWss;
  },
};
