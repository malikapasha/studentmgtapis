/**
 * AttendanceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    const { sessionId, attendance, date, classId } = req.allParams();
    if (!sessionId) {
      return res.badRequest('sessionId required');
    }
    if (!attendance || !_.isArray(attendance)) {
      return res.badRequest('attendance is required');
    }
    if (!date || !_.isString(date)) {
      return res.badRequest('date is required');
    }
    const createAttendance = async () => {
      let attendanceArr = [];
      for (const a of attendance) {
        const att = await Attendance.findOrCreate(
          {
            student: a.student,
            status: a.status,
            notes: a.notes,
            date: date,
            session: sessionId,
            classroom: classId,
            user: req.token.id
          },
          {
            student: a.student,
            status: a.status,
            notes: a.notes,
            date: date,
            session: sessionId,
            classroom: classId,
            user: req.token.id
          }
        );
        attendanceArr.push(att);
      }
      console.log('TCL: attendanceArr ', attendanceArr);
      if (attendanceArr.length) return attendanceArr;
      else throw new Error('Some error occurred. Please contact support team for help. ');
    };
    createAttendance()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },
  find: function(req, res) {
    const getAttendance = async () => {
      const newAttendance = await Attendance.find({ where: { user: req.token.id } });
      return newAttendance;
    };
    getAttendance()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  findOne: function(req, res) {
    const { sessionId, date } = req.allParams();
    if (!sessionId) {
      return res.badRequest('sessionId required');
    }
    if (!date || !_.isString(date)) {
      return res.badRequest('date is required');
    }
    const getAttendance = async () => {
      let newAttendance = await Attendance.find({
        where: {
          session: sessionId,
          user: req.token.id,
          date: date
        }
      }).populate('student');
      newAttendance = newAttendance.map(item => {
        const student = { ...item.student, status: item.status, notes: item.notes };
        return student;
      });
      return newAttendance;
    };
    getAttendance()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  update: function(req, res) {
    const { sessionId, attendance, date } = req.allParams();
    console.log('TCL: sessionId, attendance, date', sessionId, attendance, date);
    if (!sessionId) {
      return res.badRequest('sessionId required');
    }
    if (!attendance || !_.isArray(attendance)) {
      return res.badRequest('attendance is required');
    }
    if (!date || !_.isString(date)) {
      return res.badRequest('date is required');
    }
    const updateAttendance = async () => {
      let attendanceArr = [];
      for (const a of attendance) {
        const att = await Attendance.update({
          student: a.student,
          date: date,
          session: sessionId,
          user: req.token.id
        })
          .set({
            student: a.student,
            status: a.status,
            notes: a.notes,
            date: date,
            session: sessionId,
            user: req.token.id
          })
          .fetch();
        attendanceArr.push(att);
      }
      console.log('TCL: updateAttendance ', attendanceArr);
      if (attendanceArr.length) return attendanceArr;
      else throw new Error('Some error occurred. Please contact support team for help. ');
    };

    updateAttendance()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  }
};
