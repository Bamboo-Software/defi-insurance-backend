export const appConfig = {
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),
  url: process.env.APP_URL || 'http://localhost:3000',
  isProd: process.env.NODE_ENV === 'production',
  prefixPath: process.env.PREFIX_PATH || '/api',
  name: process.env.APP_NAME || 'Defi-Insurance',
  get privacyPolicy() {
    return process.env.PRIVACY_POLICY || `${this.url}/privacy-policy.html`;
  },
  get termsOfService() {
    return process.env.TERM_OF_SERVICE || `${this.url}/terms-of-service.html`;
  },
  get unsubscribeLink() {
    return process.env.UNSUBSCRIBE_LINK || `${this.host}/api/auth/unsubscribe`;
  },
  get logoUrl() {
    return process.env.NODE_ENV === 'production'
      ? `${this.url}/assets/icons/logo.svg`
      : `https://s3-sgp2.bamboosoft.io/igc/2025/03/04/1741076163909-Jfox.png`;
  },
};
