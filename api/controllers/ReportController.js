/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
/**
 * ReportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { Parser } = require('json2csv');
const d3 = require('d3');
module.exports = {
  dailyReport: function(req, res) {
    const { startDate, endDate, download } = req.allParams();
    // console.log('TCL: startDate, endDate', startDate, endDate);
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    if (!endDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    // console.log('her');
    const processReq = async () => {
      let query = `
      SELECT DATE_FORMAT(att.date, "%M %d %Y") as attendence_date,
      att.\`status\`,att.\`session\`,
      att.classroom AS class_ID,
      s.startTime, s.endTime, att.notes,
      cr.\`name\` as class_name, CONCAT(stu.firstName,' ', stu.lastName) AS student_name  FROM attendance att 
      INNER JOIN classroom cr  ON att.classroom = cr.id
      INNER JOIN \`session\` s ON att.\`session\` = s.id
      INNER JOIN student stu ON stu.id = att.student
      WHERE (DATE(att.date) BETWEEN '${startDate}' AND '${endDate}') AND att.\`user\` = ${req.token.id}
      GROUP BY DATE(att.date), att.student, att.classroom, att.\`session\`
      ORDER BY DATE(att.date) DESC`;
      let attendance = await sails.sendNativeQuery(query, []);
      attendance = attendance.rows;
      // console.log('TCL: -> attendance', attendance);
      const data = _.groupBy(attendance, 'attendence_date');
      let newData = [];
      for (let d of Object.keys(data)) {
        let newobj = {};
        newobj['date'] = d;
        let unique = _.groupBy(data[d], 'class_ID');
        newobj['classes'] = unique;
        for (let dd of Object.keys(newobj['classes'])) {
          let session = _.groupBy(newobj['classes'][dd], 'session');
          newobj['classes'][dd] = session;
        }
        newData.push(newobj);
      }

      if (!attendance) {
        throw new Error('invalid credentials provided');
      }
      return newData;
    };

    processReq()
      .then(rs => {
        if (download === true) {
          // console.log('if', download);
          const parser = new Parser({});
          const csv = parser.parse([rs]);
          res.setHeader('Content-disposition', 'attachment; filename=' + 'daily-report.csv');
          return res.send(csv);
        } else {
          // console.log('else', rs);
          return res.ok(rs);
        }
      })
      .catch(err => {
        // console.log('TCL: err', err);
        res.status(400).send({ err });
      });
  },
  dailyReportDownload: function(req, res) {
    const { startDate, endDate } = req.allParams();
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    if (!endDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    const processReq = async () => {
      let query = `
      SELECT DATE_FORMAT(att.date, "%M %d %Y") as attendence_date,
      att.\`status\`,att.\`session\`,
      att.classroom AS class_ID,
      s.startTime, s.endTime, att.notes,
      cr.\`name\` as class_name, CONCAT(stu.firstName,' ', stu.lastName) AS student_name  FROM attendance att 
      INNER JOIN classroom cr  ON att.classroom = cr.id
      INNER JOIN \`session\` s ON att.\`session\` = s.id
      INNER JOIN student stu ON stu.id = att.student
      WHERE (DATE(att.date) BETWEEN '${startDate}' AND '${endDate}') AND att.\`user\` = ${req.token.id}
      GROUP BY DATE(att.date), att.student, att.classroom, att.\`session\`
      ORDER BY DATE(att.date) DESC`;
      let attendance = await sails.sendNativeQuery(query, []);
      attendance = attendance.rows;
      // console.log('TCL: processReq -> attendance', attendance);

      if (!attendance) {
        throw new Error('invalid credentials provided');
      }
      return attendance;
    };

    processReq()
      .then(rs => {
        // console.log('rs');
        // console.log(rs);
        return res.ok(rs);
      })
      .catch(err => {
        // console.log('TCL: err', err);
        res.status(400).send({ err });
      });
  },
  studentReport: function(req, res) {
    const { startDate, endDate, studentId, classId, download } = req.allParams();
    // console.log('TCL: download', download);
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    if (!endDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    if (!studentId) {
      return res.badRequest({
        err: 'studentId is not provided'
      });
    }
    const processReq = async () => {
      let query = `
      SELECT DATE_FORMAT(att.date, "%M %d %Y") as attendence_date,
      att.\`status\`,att.\`session\`,
      att.classroom AS class_ID,
      s.startTime, s.endTime, att.notes,
      cr.\`name\` as class_name, CONCAT(stu.firstName,' ', stu.lastName) AS student_name  FROM attendance att 
      INNER JOIN classroom cr  ON cr.id = att.classroom
      INNER JOIN \`session\` s ON s.id = att.\`session\`
      INNER JOIN student stu ON stu.id = att.student
      WHERE (DATE(att.date) BETWEEN '${startDate}' AND '${endDate}') AND att.\`user\` = ${
        req.token.id
      } AND att.student = ${studentId} ${classId ? 'AND cr.id = ' + classId : ''}
      GROUP BY DATE(att.date), att.student, att.classroom, att.\`session\`
      ORDER BY DATE(att.date) DESC`;
      let attendance = await sails.sendNativeQuery(query, []);
      attendance = attendance.rows;
      if (!attendance) {
        throw new Error('invalid credentials provided');
      }
      return attendance;
    };

    processReq()
      .then(rs => {
        if (download === true) {
          const parser = new Parser({});
          const csv = parser.parse([rs]);
          res.setHeader('Content-disposition', 'attachment; filename=' + 'student-report.csv');
          return res.send(csv);
        } else {
          return res.ok(rs);
        }
      })
      .catch(err => {
        res.status(400).send({ err });
      });
  },
  classReport: function(req, res) {
    const { startDate, endDate, classId, download } = req.allParams();
    // console.log('paramss ', startDate, endDate, classId, download);
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    if (!endDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    if (!classId) {
      return res.badRequest({
        err: 'studentId is not provided'
      });
    }
    const processReq = async () => {
      let query = `
      SELECT DATE_FORMAT(att.date, "%M %d %Y") as attendence_date,
      att.\`status\`,att.\`session\`,
      att.classroom AS class_ID,
      s.startTime, s.endTime, att.notes,
      cr.\`name\` as class_name, CONCAT(stu.firstName,' ', stu.lastName) AS student_name  FROM attendance att 
      INNER JOIN classroom cr  ON cr.id = att.classroom
      INNER JOIN \`session\` s ON s.id = att.\`session\`
      INNER JOIN student stu ON stu.id = att.student
      WHERE (DATE(att.date) BETWEEN '${startDate}' AND '${endDate}') AND att.\`user\` = ${req.token.id} AND att.classroom = ${classId}
      GROUP BY DATE(att.date), att.student, att.classroom, att.\`session\`
      ORDER BY DATE(att.date) DESC`;
      let attendance = await sails.sendNativeQuery(query, []);
      attendance = attendance.rows;
      if (!attendance) {
        throw new Error('invalid credentials provided');
      }
      // console.log('attendance', attendance.length);
      if (attendance.length) {
        const nested_data = d3
          .nest()
          .key(function(d) {
            return d.attendence_date;
          })
          .key(function(d) {
            return d.class_ID;
          })
          .key(function(d) {
            return d.session;
          })
          .entries(attendance);
        return nested_data;
      } else {
        return attendance;
      }
    };

    processReq()
      .then(rs => {
        // console.log('TCL: rs', rs);
        return res.ok(rs);
      })
      .catch(err => {
        res.status(400).send({ err });
      });
  },
  classReportDownload: function(req, res) {
    const { startDate, endDate, classId } = req.allParams();
    // console.log('params ', startDate, endDate, classId);
    if (!startDate) {
      return res.badRequest({
        err: 'startDate is not provided'
      });
    }
    if (!endDate) {
      return res.badRequest({
        err: 'endDate is not provided'
      });
    }
    if (!classId) {
      return res.badRequest({
        err: 'studentId is not provided'
      });
    }
    const processReq = async () => {
      let query = `
      SELECT DATE_FORMAT(att.date, "%M %d %Y") as attendence_date,
      att.\`status\`,att.\`session\`,
      att.classroom AS class_ID,
      s.startTime, s.endTime, att.notes,
      cr.\`name\` as class_name, CONCAT(stu.firstName,' ', stu.lastName) AS student_name  FROM attendance att 
      INNER JOIN classroom cr  ON cr.id = att.classroom
      INNER JOIN \`session\` s ON s.id = att.\`session\`
      INNER JOIN student stu ON stu.id = att.student
      WHERE (DATE(att.date) BETWEEN '${startDate}' AND '${endDate}') AND att.\`user\` = ${req.token.id} AND att.classroom = ${classId}
      GROUP BY DATE(att.date), att.student, att.classroom, att.\`session\`
      ORDER BY DATE(att.date) DESC`;
      let attendance = await sails.sendNativeQuery(query, []);
      attendance = attendance.rows;
      if (!attendance) {
        throw new Error('invalid credentials provided');
      }

      return attendance;
    };

    processReq()
      .then(rs => {
        // console.log('TCL: rs', rs);
        return res.ok(rs);
      })
      .catch(err => {
        res.status(400).send({ err });
      });
  },
  sendEmail: function(req, res) {
    const { email, subject, body } = req.allParams();
    if (!email) {
      return res.badRequest({
        err: 'email is not provided'
      });
    }
    if (!subject) {
      return res.badRequest({
        err: 'subject is not provided'
      });
    }
    if (!body) {
      return res.badRequest({
        err: 'body is not provided'
      });
    }
    EmailService.sendEmail({
      toEmail: email,
      subject,
      body
    });
    return res.ok('Email sent.');
  }
};
