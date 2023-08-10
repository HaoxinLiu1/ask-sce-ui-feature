const axios = require('axios');
const qs = require('qs');

const configuation = require('../lib/config');
const logger = require('./logger');

let keyVaultToken = null;

/**
 * * This function will geneate new access token using the user refresh token.
 * @param {*} refreshToken
 * @returns {accessToken,refresh_token,expries_in}
 */
const updateTokens = (refreshToken) =>
  new Promise((resolve, reject) => {
    try {
      const data = {
        grant_type: 'refresh_token',
        client_id: configuation.creds.clientID,
        client_secret: configuation.creds.clientSecret,
        redirect_uri: configuation.creds.redirectUrl,
        refresh_token: refreshToken,
      };
      const params = Object.keys(data)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
        )
        .join('&');
      axios({
        method: 'POST',
        url: configuation.tokenAuthURL,
        data: params,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      })
        .then((r) => {
          resolve([
            r.data.access_token,
            r.data.refresh_token,
            r.data.expires_in,
          ]);
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });

/**
 * * This function will generate a key vault access token which will be using to fetch the secret keys stored in azure key vault
 *
 * @return {accessToken}
 */
const getKeyVaultToken = () =>
  new Promise((resolve, reject) => {
    try {
      if (keyVaultToken !== null) {
        if (keyVaultToken.expiresAt - Date.now() / 1000 > 30) {
          resolve(keyVaultToken.accessToken);
          return;
        }
      }
      const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: configuation.creds.clientID,
        client_secret: configuation.creds.clientSecret,
        scope: configuation.keyVaultScope,
      });

      axios({
        method: 'POST',
        url: configuation.tokenAuthURL,
        data,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      })
        .then((r) => {
          keyVaultToken = {
            expiresAt: Date.now() / 1000 + r.data.expires_in,
            accessToken: r.data.access_token,
          };
          resolve(r.data.access_token);
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });

module.exports = {
  updateTokens,
  getKeyVaultToken,
};
