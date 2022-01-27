/**
 * ClassController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment');
module.exports = {
  create: function(req, res) {
    if (!req.param('name') || _.isEmpty(req.param('name'))) {
      return res.badRequest('ClassRoom Name Required');
    }
    if (!req.param('info') || _.isEmpty(req.param('info'))) {
      return res.badRequest('ClassRoom Info Required');
    }
    if (!req.param('weekDays') || _.isEmpty(req.param('weekDays'))) {
      return res.badRequest('weekDays Info Required');
    }
    if (!req.param('studentList') || !_.isArray(req.param('studentList'))) {
      return res.badRequest('Student List Required');
    }
    if (!req.param('sessions') || !_.isArray(req.param('sessions'))) {
      return res.badRequest('Sessions List Required');
    }
    let sessionIds = [];
    const createClass = async () => {
      //create session and fetch their ids to store in class
      for (let i = 0; i < req.param('sessions').length; i++) {
        const obj = req.param('sessions')[i];
        let props = {
          startTime: moment(new Date(obj.startTime))
            .zone('+05:00')
            .format(),
          endTime: moment(new Date(obj.endTime))
            .zone('+05:00')
            .format()
        };
        const session = await Session.create({
          ...props,
          user: req.token.id
        }).fetch();
        sessionIds.push(session.id);
      }
      const newClass = await ClassRoom.create({
        name: req.param('name'),
        info: req.param('info'),
        ...req.param('weekDays'),
        user: req.token.id
      }).fetch();
      //saving student ids and session ids against created class id
      await ClassRoom.addToCollection(newClass.id, 'student', req.param('studentList'));
      if (sessionIds.length) {
        await ClassRoom.addToCollection(newClass.id, 'session', sessionIds);
      }
      return newClass;
    };
    createClass()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },

  findAll: function(req, res) {
    const day = req.param('day');
    const activeStatus = req.param('activeStatus');
    let statusFilter = {};
    if (activeStatus) {
      activeStatus === 'archive'
        ? (statusFilter = { activeStatus: { '!=': 0 } })
        : (statusFilter = { activeStatus: 1 });
    } else {
      statusFilter = { activeStatus: { '!=': 3 } };
    }
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let query = {};
    if (days.includes(day)) {
      query = { where: { user: req.token.id, [day]: true, ...statusFilter } };
    } else {
      query = { where: { user: req.token.id, ...statusFilter } };
    }
    const getClasses = async () => {
      let allClasses = await ClassRoom.find({ ...query })
        .populate('student', {
          where: {
            activeStatus: 1
          },
          select: [
            'activeStatus',
            'firstName',
            'lastName',
            'dob',
            'imageUrl',
            'phone',
            'email',
            'notes',
            'user'
          ]
        })
        .populate('session');
      // console.log('TCL: getClasses -> allClasses', allClasses.length);

      return allClasses;
    };

    getClasses()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  findAttendanceClasses: function(req, res) {
    const day = req.param('day');
    const date = req.param('date');
    // console.log('TCL: date', date);

    let query = { where: { user: req.token.id, [day]: true, activeStatus: { '!=': 3 } } };

    const getClasses = async () => {
      let newClasses = [];
      let allClasses = await ClassRoom.find({ ...query }).populate('session');
      // console.log('TCL: getClasses -> allClasses', allClasses);
      // console.log('TCL: session -> allClasses', allClasses[0].session);
      let minItemExist = 0;
      // allClasses = await Promise.all(
      //   allClasses.map(async item => {
      for (let item of allClasses) {
        minItemExist = 0;
        if (item.session.length) {
          // await Promise.all(
          //   item.session.map(async (element, key) => {
          let iterable = 0;
          for (let element of item.session) {
            const status = await Attendance.count({
              session: element.id,
              date: date
            });
            console.log('TCL:   -> status', status, iterable);
            if (status > 0) {
              minItemExist = 1;
              item.session[iterable].attendanceStatus = 1;
            } else {
              item.session[iterable].attendanceStatus = 0;
            }
            iterable += 1;
          }
          if (minItemExist) {
            item.status = 1;
          } else {
            item.status = 0;
          }
        } else {
          item.status = 0;
        }
        // console.log('TCL: getClasses -> item', item);
        newClasses.push(item);
      }

      console.log('TCL: findAttendanceClasses -> allClasses', newClasses);
      console.log('TCL: findAttendanceClasses -> allClasses', newClasses[0].session);
      return newClasses;
    };

    getClasses()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },

  findOne: function(req, res) {
    if (!req.param('id') || _.isEmpty(req.param('id'))) {
      return res.badRequest('ClassRoom Id Not Found');
    }
    const getClass = async () => {
      const newUser = await ClassRoom.findOne({
        where: { id: req.param('id'), user: req.token.id }
      }).populate('student', {
        where: {
          activeStatus: 1
        },
        select: [
          'activeStatus',
          'firstName',
          'lastName',
          'dob',
          'imageUrl',
          'phone',
          'email',
          'notes',
          'user'
        ]
      });
      // console.log('TCL: getClass -> newUser', newUser.name);
      return newUser;
    };
    getClass()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  update: function(req, res) {
    if (!req.param('id')) {
      return res.badRequest('Id is required');
    }
    let classId = req.param('id');

    const updateClass = async () => {
      const oldClass = await ClassRoom.count({
        id: classId
      });
      console.log('TCL: updateClass -> oldClass', oldClass);

      if (oldClass < 1) {
        throw new Error('Invalid classroom Id');
      }

      let classObj = {};

      if (req.param('name') !== undefined && _.isString(req.param('name'))) {
        classObj.name = req.param('name');
      }
      if (req.param('info') !== undefined && _.isString(req.param('info'))) {
        classObj.info = req.param('info');
      }
      let weekDays = {};
      if (req.param('weekDays') !== undefined && _.isObject(req.param('weekDays'))) {
        weekDays = req.param('weekDays');
      }
      let studentArr = [];
      if (req.param('studentList') !== undefined && _.isArray(req.param('studentList'))) {
        studentArr = req.param('studentList');
      }
      if (!req.param('sessions') || !_.isArray(req.param('sessions'))) {
        console.log('here ');
        return res.badRequest('Sessions List Required');
      }
      console.log('ses', req.param('sessions'));
      const updatedClass = await ClassRoom.update(
        {
          id: classId
        },
        { ...classObj, ...weekDays }
      ).fetch();
      studentArr.length && (await ClassRoom.replaceCollection(classId, 'student', studentArr));

      let sessionIds = [];
      //create session and fetch their ids to store in class
      for (let i = 0; i < req.param('sessions').length; i++) {
        console.log('TCL: session', req.param('sessions'));
        const obj = req.param('sessions')[i];
        let props = {
          startTime: moment(new Date(obj.startTime))
            .zone('+05:00')
            .format(),
          endTime: moment(new Date(obj.endTime))
            .zone('+05:00')
            .format()
        };
        const sessionObj = await Session.findOne({
          where: { id: obj.id }
        });
        console.log('TCL:   props', props);
        if (sessionObj) {
          sessionIds.push(sessionObj.id);
          await Session.update(
            {
              id: sessionObj.id
            },
            { ...props }
          );
        } else {
          const session = await Session.create({
            ...props,
            user: req.token.id
          }).fetch();
          sessionIds.push(session.id);
          console.log('Not FOund');
        }
      }
      sessionIds.length && (await ClassRoom.replaceCollection(classId, 'session', sessionIds));

      if (updatedClass) return updatedClass;
      throw new Error('Some error occurred. Please contact development team for help.', {
        status: 403
      });
    };
    updateClass()
      .then(res.ok)
      .catch(err => {
        console.log('TCL: getClasses -> err', err);
        res.status(403).send(JSON.stringify(err));
      });
  },
  statusUpdate: function(req, res) {
    let classId = req.param('id');
    let activeStatus = req.param('activeStatus');
    if (!req.param('id')) {
      return res.badRequest('Id Not Found');
    }
    const processReq = async () => {
      const classItem = await ClassRoom.count({
        id: classId
      });

      if (classItem < 1) {
        return new Error('Invalid classItem Id');
      }
      await ClassRoom.update(
        {
          id: classId
        },
        { activeStatus }
      );
      return 'Class Status Updated successfully';
    };

    processReq()
      .then(res.ok)
      .catch(err => res.status(403).send(err));
  }
};
