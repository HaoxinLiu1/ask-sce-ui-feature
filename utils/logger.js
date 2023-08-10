const chalk = require('chalk');
const config = require('../lib/config');

const { log, dir } = console;

const shouldLog = config.enableLog === '1';

/**
 * * Function to log error
 *
 * @param {*} data
 * @param {number} [d=2]
 */
function error(data, d = 2) {
  if (typeof data === 'object') {
    log(chalk.bold.bgRed('Error :: Object'));
    dir(data, { depth: d });
  } else {
    log(chalk.bold.bgRed('Error'), `${data}`);
  }
}

/**
 * * Function to log success
 *
 * @param {*} data
 * @param {number} [d=2]
 */
function success(data, d = 2) {
  if (shouldLog) {
    if (typeof data === 'object') {
      log(chalk.bold.bgGreenBright('Success :: Object'));
      dir(data, { depth: d });
    } else {
      log(chalk.bold.bgGreenBright('Success'), `${data}`);
    }
  }
}

/**
 * * Function to log the warnings
 *
 * @param {*} data
 * @param {number} [d=2]
 */
function warn(data, d = 2) {
  if (shouldLog) {
    if (typeof data === 'object') {
      log(chalk.bold.black.bgYellow('Warning :: Object'));
      dir(data, { depth: d });
    } else {
      log(chalk.bold.black.bgYellow('Warning'), `${data}`);
    }
  }
}

/**
 * * function to log data
 *
 * @param {*} data
 * @param {number} [d=2]
 */
function print(data, d = 2) {
  if (shouldLog) {
    if (typeof data === 'object') {
      log(chalk.bold.bgGray('Log :: Object'));
      dir(data, { depth: d });
    } else {
      log(chalk.bold.bgGray('Log'), `${data}`);
    }
  }
}

module.exports = {
  warn,
  error,
  success,
  log: print,
};
