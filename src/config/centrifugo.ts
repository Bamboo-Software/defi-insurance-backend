export const centrifugoConfig = {
  apiUrl: process.env.CENTRIFUGO_API_URL,
  apiKey: process.env.CENTRIFUGO_API_KEY || '',
  tokenSecret: process.env.CENTRIFUGO_TOKEN_SECRET,
  subscriptionTokenSecret:
    process.env.CENTRIFUGO_SUBSCRIPTION_TOKEN_SECRET ||
    process.env.CENTRIFUGO_TOKEN_SECRET,
  personalChannelNamespace: `$${process.env.CENTRIFUGO_PERSONAL_CHANNEL_NAMESPACE || ''}`,
  prefixChannelName: `$${process.env.CENTRIFUGO_PREFIX_CHANNEL_NAME || 'jfox-game-'}`,
};
