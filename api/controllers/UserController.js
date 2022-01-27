/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let UtilService = require('../services/UtilService');
module.exports = {
  create: function(req, res) {
    //make sure email is provided
    if (!req.param('email') || !_.isString(req.param('email'))) {
      return res.badRequest('email required');
    }

    if (!req.param('password') || !_.isString(req.param('password'))) {
      return res.badRequest('password is required');
    }
    const createUser = async () => {
      const checkUser = await User.count({
        email: req.param('email')
      });
      if (checkUser > 0) {
        throw new Error('This email address is already in use', {
          status: 403
        });
      }
      let encryptedPassword = await UtilService.getEncryptedPassword(req.param('password'));
      if (!encryptedPassword)
        throw new Error('Some error occurred. Please contact support team for help', {
          status: 403
        });
      const newUser = await User.create({
        name: req.param('name'),
        email: req.param('email'),
        password: encryptedPassword
      }).fetch();
      if (newUser) return newUser;
      else throw new Error('Some error occurred. Please contact support team for help. ');
    };

    createUser()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  login: function(req, res) {
    const { email, password } = req.allParams();
    if (!email) {
      return res.badRequest({
        err: 'email is not provided'
      });
    }
    if (!password) {
      return res.badRequest({
        err: 'password is not provided'
      });
    }
    const processReq = async () => {
      const user = await User.findOne({
        email
      }).populate('license', {where: {activeStatus: 1}});
      if (!user) {
        throw new Error('invalid credentials provided');
      }
      const rsp = {
        user: user,
        token: jwToken.issue(
          {
            id: user.id
          },
          '7 days'
        )
      };
      return rsp;
    };

    processReq()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },
  getUserByEmail: function(req, res) {
    const { email } = req.allParams();
    if (!email) {
      return res.badRequest({
        err: 'email is not provided'
      });
    }
    const processReq = async () => {
      const user = await User.findOne({
        email
      });
      if (!user) {
        throw new Error('invalid credentials provided');
      }
      return user;
    };

    processReq()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },
  addLicense: function(req, res) {
    const { paymentId, receiptId, startDate, endDate } = req.allParams();
    if (!endtDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    const processReq = async () => {
      await License.update(
        {
          user: req.token.id
        },
        {
          activeStatus: 0
        }
      );
      const license = await License.create({
        paymentId,
        receiptId,
        startDate,
        endDate,
        user: req.token.id,
        activeStatus: 1
      }).fetch();
      if (!license) {
        throw new Error('invalid license provided');
      }
      return license;
    };

    processReq()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
