/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  StudentController: {
    '*': 'tokenAuth'
  },
  ClassRoomController: {
    '*': 'tokenAuth'
  },
  AttendanceController: {
    '*': 'tokenAuth'
  },
  ReportController: {
    '*': 'tokenAuth'
  },
  WorkspaceController: {
    '*': 'tokenAuth',
    // 'addMember': ['tokenAuth', 'licenseAuth'],
    // 'updateMember': ['tokenAuth', 'licenseAuth'],
    // 'deleteMember': ['tokenAuth', 'licenseAuth']
  },
  UserController: {
    'login': true,
    'create': true,
    'addLicense': 'tokenAuth',
    'getUserByEmail': 'tokenAuth',
  }
};
