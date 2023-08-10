require('dotenv').config();

exports.creds = {
  //  Required
  identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`,

  // Client ID of app registration
  clientID: process.env.CLIENT_ID,

  // Required,
  // If you want to get access_token, you must use 'code', 'code id_token' or 'id_token code'
  responseType: 'code id_token',

  // Required
  responseMode: 'form_post',

  // Required, the reply URL registered in AAD for your app
  redirectUrl: process.env.REDIRECT_URL,

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: true,

  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
  clientSecret: process.env.CLIENT_SECRET,

  // Required to set to false if you don't want to validate issuer
  validateIssuer: false,

  // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
  issuer: null,

  // Required to set to true if the `verify` function has 'req' as the first parameter
  passReqToCallback: false,

  // Recommended to set to true. By default we save state in express session, if this option is set to true, then
  // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
  // to be completely express session free.
  useCookieInsteadOfSession: true,

  // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
  // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
  // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
  cookieEncryptionKeys: [
    { key: process.env.KEY_1, iv: process.env.IV_1 },
    { key: process.env.KEY_2, iv: process.env.IV_2 },
  ],

  // The additional scopes we want besides 'openid'.
  // 'profile' scope is required, the rest scopes are optional.
  // (1) if you want to receive refresh_token, use 'offline_access' scope
  // (2) if you want to get access_token for graph api, use the graph api url like 'https://graph.microsoft.com/.default'
  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/.default'],

  // Optional, 'error', 'warn' or 'info'
  loggingLevel: 'error',

  // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
  nonceLifetime: null,

  // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
  nonceMaxAmount: 5,

  // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
  clockSkew: null,
};

exports.destroySessionUrl = 'https://login.microsoftonline.com/common/oauth2/logout';

exports.enableLog = process.env.ENABLE_LOG || '1';

exports.expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;

exports.appInsightsConnString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

exports.tenantID = process.env.TENANT_ID;

exports.vaultURL = {
  dbPwordSecretURL: `${process.env.VAULTURI}/secrets/${process.env.DBPASSWORDKEY}?api-version=2016-10-01`,
  dbUnameSecretURL: `${process.env.VAULTURI}/secrets/${process.env.DBUSERNAMEKEY}?api-version=2016-10-01`,
};

exports.databaseSetup = {
  server: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  pool: {
    maxPool: 20,
    minPool: 1,
    idleTimeOut: 30000,
  },
  encrypt: true,
};

exports.tokenAuthURL = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

exports.keyVaultScope = 'https://vault.azure.net/.default';
