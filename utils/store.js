const Loki = require('lokijs');
const logger = require('./logger');
const token = require('./token');

let users = null;

/** @type {*} */
const store = new Loki('userstore.db', {
  autoload: true,
  autoloadCallback: databaseIntialize,
  autosave: true,
  autosaveInterval: 4000,
});

/**
 * * This function will initialize the Loki store with new collction users
 *
 */
function databaseIntialize() {
  users = store.getCollection('users');
  if (users === null) {
    users = store.addCollection('users', {
      unique: ['oid'],
    });
  }
}

/**
 *  * This function add new user to the collection "users"
 *
 * @param {*} userDetails
 */
const addUser = async (userDetails) => {
  const userDetailsObj = userDetails;

  users.insert(userDetailsObj);
};

/**
 * * This function returns the user by using the id passed.
 *
 * @param {*} id
 * @param {*} fn
 * @return {*}
 */
const getUser = (id, fn) => {
  try {
    const user = users.findOne({ oid: { $eq: id } });
    if (user === null) return fn(null, null);
    return fn(null, user);
  } catch (err) {
    logger.error(err);
    return fn(err, null);
  }
};

/**
 * This function will update the user details uding the passed ID
 *
 * @param {*} id
 * @param {*} user
 */
const updateUser = (id, user) => {
  try {
    users.findAndUpdate({ oid: { $eq: id } }, async (details) => {
      const storedDetails = details;
      Object.keys(user).forEach((key) => {
        storedDetails[key] = user[key];
      });

      users.update(storedDetails);
    });
  } catch (err) {
    logger.error(err);
  }
};

/**
 * * This function will return the access token of the user and if access token is expired , it will generate new access token using the user refresh token.
 *
 * @param {*} id
 * @return {accessToken}
 */
const getAccessToken = (id) =>
  new Promise((resolve, reject) => {
    try {
      const user = users.findOne({ oid: { $eq: id } });
      const { exp } = user;
      if (exp - Date.now() / 1000 > 30) {
        resolve(user.accessToken);
      } else {
        token
          .updateTokens(user.refreshToken)
          .then(([accessToken, refreshToken, expiresIn]) => {
            user.exp = Date.now() / 1000 + expiresIn;
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            users.update(user);
            resolve(accessToken);
          });
      }
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });

module.exports = {
  addUser,
  getUser,
  updateUser,
  getAccessToken,
};
