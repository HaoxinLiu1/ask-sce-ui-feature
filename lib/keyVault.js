require('dotenv').config();
const axios = require('axios');
const token = require('../utils/token');
const logger = require('../utils/logger');

/**
 * * This function will fetch the value from KeyVault using the Secret key. Key vault token will be fetched using the client credential grant flow,
 * * using the clientID and client Secret and scope as 'https://vault.azure.net/.default'.
 * @param {*} secretURL
 * @return {*}
 */
const getValueFromVault = (secretURL) =>
  new Promise((resolve, reject) => {
    try {
      token.getKeyVaultToken().then((vaulttoken) => {
        axios({
          method: 'GET',
          url: secretURL,
          headers: {
            Authorization: `Bearer ${vaulttoken}`,
          },
        })
          .then((result) => {
            resolve(result.data.value);
          })
          .catch((err) => {
            logger.error(err);
            reject(err);
          });
      });
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });

module.exports = {
  getValueFromVault,
};
