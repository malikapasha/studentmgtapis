/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': { view: 'pages/homepage' },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  //user

  'POST /user/signup': 'UserController.create',
  'POST /user/login': 'UserController.login',
  'POST /user/license': 'UserController.addLicense',
  'GET /user': 'UserController.getUserByEmail',

  //student

  'GET /student/findOne': 'StudentController.findOne',
  'GET /student/findAll': 'StudentController.findAll',
  'GET /student/findAllActualImage': 'StudentController.findAllActualImage',
  'POST /student/create': 'StudentController.create',
  'POST /student/update': 'StudentController.update',
  'DELETE /student/delete': 'StudentController.delete',

  //class

  'GET /class/findOne': 'ClassRoomController.findOne',
  'GET /class/findAll': 'ClassRoomController.findAll',
  'GET /class/findAttendanceClasses': 'ClassRoomController.findAttendanceClasses',
  'POST /class/create': 'ClassRoomController.create',
  'PUT /class/update/:id': 'ClassRoomController.update',
  'PUT /class/statusUpdate/:id': 'ClassRoomController.statusUpdate',

  //attendance

  'GET /attendance/findone': 'AttendanceController.findOne',
  'GET /attendance/find': 'AttendanceController.find',
  'POST /attendance/create': 'AttendanceController.create',
  'PUT /attendance/update': 'AttendanceController.update',

  //workspace

  'GET /workspace/findone': 'WorkspaceController.findWSOfUser',
  'POST /workspace/create': 'WorkspaceController.create',
  'PUT /workspace/update': 'WorkspaceController.update',
  'POST /workspace/member': 'WorkspaceController.addMember',
  'PUT /workspace/member': 'WorkspaceController.updateMember',
  'GET /workspace/member': 'WorkspaceController.memberWorkspace',
  'GET /workspace/member/switch': 'WorkspaceController.switchWorkspace',
  'DELETE /workspace/member': 'WorkspaceController.deleteMember',

  //Report

  'GET /report/daily': 'ReportController.dailyReport',
  'GET /report/dailyReportDownload': 'ReportController.dailyReportDownload',
  'GET /report/student': 'ReportController.studentReport',
  'GET /report/class': 'ReportController.classReport',
  'GET /report/classDownload': 'ReportController.classReportDownload'
};
