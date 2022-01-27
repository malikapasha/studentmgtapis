module.exports = {
  getEncryptedPassword: async password => {
    return new Promise((resolve, reject) => {
      require('machinepack-passwords')
        .encryptPassword({
          password: password
        })
        .exec({
          error: function(err) {
            if (!password) {
              return reject('Missing password field');
            }
            return reject(err);
          },
          success: enryptedPass => {
            return resolve(enryptedPass);
          }
        });
    });
  }
}
