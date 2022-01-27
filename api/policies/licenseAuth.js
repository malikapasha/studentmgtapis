/**
 * licenseAuth
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
const moment = require('moment');
module.exports = function(req, res, next) {
  if (!req.token) return res.unauthorized('Please login to access this resource');

  const processRequest = async () => {
    const licence = await Licence.findOne({ user: req.token.id });

    if (!licence)
      throw new Error('You do not have any active licence. Please contact support for help');
    if (licence.activeStatus !== 1) {
      throw new Error('You do not have any active licence. Please contact support for help');
    }
    if (moment().isAfter(licence.endDate)) {
      await Licence.update({ user: req.token.id }, { activeStatus: 0 });
      throw new Error('You do not have any active licence. Please contact support for help');
    }
    return true;
  };

  processRequest()
    .then(allowed => {
      if (allowed) {
        return next();
      } else {
        return res.forbidden('You do not have any active licence. Please contact support for help');
      }
    })
    .catch(err => res.status(401).send(err));
};
