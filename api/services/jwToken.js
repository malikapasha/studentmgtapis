/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken'),
  secret = 'KeEs84fF';

// Generates a token from supplied payload
module.exports.issue = function(payload, expiresIn) {
  if (!expiresIn) expiresIn = '2 days';
  return jwt.sign(
    payload,
    process.env.SECRET || secret, // Token Secret that we sign it with
    {
      expiresIn: expiresIn // Token Expire time
    }
  );
};

// Verifies token on a request
/**
 *
 * @param {string} token
 * @param {function} callback
 * @param {object} [options] - for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 */

const jwtVerification = function(token, callback, options, Secret) {
  return new Promise((resolve, reject) => {
    return jwt.verify(
      token, // The token to be verified
      Secret, // Same token we used to sign
      options && _.isObject(options) ? options : {},
      (err, obj) => {
        // eslint-disable-next-line callback-return
        _.isFunction(callback) && callback(err, obj);
        if (err || !obj) {
          return reject(err);
        }
        return resolve(obj);
      } //Pass errors or decoded token to callback
    );
  });
};
module.exports.verify = async function(token, callback, options) {
  try {
    const response = await jwtVerification(token, undefined, options, process.env.SECRET);
    _.isFunction(callback) && callback(undefined, response);
    return response;
  } catch (error) {
    return await jwtVerification(token, callback, options, secret);
  }
};
