/**
 * tokenAuth
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
  let token;
  try {
    host = req.headers.host.split(':')[0];
  } catch (e) {
    host = req.headers.host;
  }

  if (req.param('token')) {
    token = req.param('token');

    // We delete the token from param to not mess with blueprints
    //delete req.query.token; Enabled for demo purposes
  } else if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      let scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, { err: 'Format is Authorization: Bearer [token]' });
    }
  } else {
    return res.json(401, { err: 'No Authorization header was found' });
  }

  const reqProcess = async () => {
    let tokenObj;
    try {
      tokenObj = await jwToken.verify(token);
      if (!tokenObj) throw 'Invalid token';
    } catch (e) {
      throw new Error('Invalid Token');
    }
    const user = await User.findOne({id: tokenObj.id});
    if (!user) {
      throw new Error('User not found');
    }
    req.token = user; // This is the decrypted token or the payload you provided
    try {
      sails.log.verbose({
        id: token.id,
        host: host,
        timeStamp: new Date()
      });
    } catch (e) {}
    return true;
  };

  reqProcess()
    .then(rs => {
      next();
    })
    .catch(err => {
      res.status(401).send(err);
    });
};
