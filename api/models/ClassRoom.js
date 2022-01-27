/**
 * Class.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //1: unarchived, 2: archived, 0:delete  //class status
    activeStatus: { type: 'number', defaultsTo: 1 },
    name: {
      type: 'string'
    },
    info: {
      type: 'string'
    },
    monday: { type: 'boolean', defaultsTo: true },
    tuesday: { type: 'boolean', defaultsTo: true },
    wednesday: { type: 'boolean', defaultsTo: true },
    thursday: { type: 'boolean', defaultsTo: true },
    friday: { type: 'boolean', defaultsTo: true },
    saturday: { type: 'boolean', defaultsTo: false },
    sunday: { type: 'boolean', defaultsTo: false },
    student: {
      collection: 'student',
      via: 'classroom'
    },
    session: {
      collection: 'session',
      via: 'classroom'
    },
    user: {
      model: 'user'
    }
  }
};
