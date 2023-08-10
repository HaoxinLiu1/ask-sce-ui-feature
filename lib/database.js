const sql = require('mssql');
const logger = require('../utils/logger');
const config = require('./config');
const keyVault = require('./keyVault');

/**
 * This function will fetch and returns the database config needed for establishing the database connection
 *
 * @return {An object with all the DB connection details}
 */
const getDBConfig = async () => {
  const dbDetails = {};
  dbDetails.server = config.databaseSetup.server;
  dbDetails.database = config.databaseSetup.database;
  dbDetails.encrypt = config.databaseSetup.encrypt;
  dbDetails.pool = {
    max: config.databaseSetup.pool.maxPool,
    min: config.databaseSetup.pool.minPool,
    idleTimeoutMillis: config.databaseSetup.pool.idleTimeOut,
  };
  dbDetails.user = await keyVault.getValueFromVault(
    config.vaultURL.dbUnameSecretURL,
  );
  dbDetails.password = await keyVault.getValueFromVault(
    config.vaultURL.dbPwordSecretURL,
  );
  return dbDetails;
};

let connectionPool = null;

/**
 * * This function will create a connection with the sql database using the DB config and return the connection pool
 *
 * @return {*}
 */
const mainPool = async () => {
  const dbConfig = await getDBConfig();

  // Try to create a new connection pool
  return new Promise((resolve, _reject) => {
    // Return acquired pool if exists
    if (connectionPool) {
      resolve(connectionPool);
    }

    // Else try establishing a new connection
    const connection = new sql.ConnectionPool(dbConfig);
    connection.on('close', () => {
      connectionPool = null;
    });
    connection.on('error', (err) => {
      if (err) {
        logger.log(err);
      }
      connectionPool = null;
    });
    connection
      .connect()
      .then((pool) => {
        connectionPool = pool;
        resolve(pool);
      })
      .catch((err) => {
        logger.log(err);
        connectionPool = null;
        _reject(err);
      });
  });
};

module.exports = { sql, mainPool };
