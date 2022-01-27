/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    activeStatus: { type: 'number', defaultsTo: 1 },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    dob: {
      type: 'ref',
      columnType: 'datetime'
    },
    // imageUrl: {
    //   type: 'string'
    // },
    // actualImage: {
    //   type: 'string'
    // },
    imageUrl: {
      type: 'ref',
      columnType: 'longtext'
    },
    actualImage: {
      type: 'ref',
      columnType: 'longtext'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    notes: {
      type: 'string'
    },
    classroom: {
      collection: 'classroom',
      via: 'student'
    },
    user: {
      model: 'user'
    },
    attendance: {
      collection: 'attendance',
      via: 'student'
    }
  }
  // customToJSON: function() {
  //   return _.omit(this, ['actualImage', 'imageUrl']);
  // }
};
