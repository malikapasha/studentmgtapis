/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    if (!req.param('students') || _.isEmpty(req.param('students'))) {
      return res.badRequest('Students Required');
    }
    const createStudent = async () => {
      for (let i = 0; i < req.param('students').length; i++) {
        const obj = req.param('students')[i];
        let props = { firstName: obj.firstName, lastName: obj.lastName };
        if (obj.phone) {
          props.phone = obj.phone;
        }
        if (obj.email) {
          props.email = obj.email;
        }
        if (obj.imageUrl) {
          props.imageUrl = obj.imageUrl;
        }
        await Student.create({
          ...props,
          user: req.token.id
        });
      }
    };
    createStudent()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },

  findAll: function(req, res) {
    const getStudents = async () => {
      const newUsers = await Student.find({
        where: { user: req.token.id, activeStatus: 1 },
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
      return newUsers;
    };
    getStudents()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },

  findAllActualImage: function(req, res) {
    const getStudents = async () => {
      const newUsers = await Student.find({
        where: { user: req.token.id, activeStatus: 1 },
        select: ['actualImage']
      });
      return newUsers;
    };
    getStudents()
      .then(res.ok)
      .catch(err => {
        res.status(400).send(err);
      });
  },

  findOne: function(req, res) {
    if (!req.param('id') || _.isEmpty(req.param('id'))) {
      return res.badRequest('Student Id Not Found');
    }
    const getStudent = async () => {
      const newUser = await Student.findOne({ where: { id: req.param('id'), user: req.token.id } });
      return newUser;
    };
    getStudent()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },

  update: function(req, res) {
    if (!req.param('id')) {
      return res.badRequest('Id is required');
    }
    let studentId = req.param('id');

    const updateStudent = async () => {
      const oldStudent = await Student.count({
        id: studentId
      });

      if (oldStudent < 1) {
        return new Error('Invalid student Id');
      }

      let student = {};
      if (req.param('firstName') !== undefined && _.isString(req.param('firstName'))) {
        student.firstName = req.param('firstName');
      }
      if (req.param('lastName') !== undefined && _.isString(req.param('lastName'))) {
        student.lastName = req.param('lastName');
      }
      if (req.param('dob') !== undefined) {
        student.dob = req.param('dob');
      }
      if (req.param('imageUrl') !== undefined && _.isString(req.param('imageUrl'))) {
        student.imageUrl = req.param('imageUrl');
      }
      if (req.param('actualImage') !== undefined && _.isString(req.param('actualImage'))) {
        student.actualImage = req.param('actualImage');
      }
      if (req.param('phone') !== undefined && _.isString(req.param('phone'))) {
        student.phone = req.param('phone');
      }
      if (req.param('email') !== undefined && _.isString(req.param('email'))) {
        student.email = req.param('email');
      }
      if (req.param('notes') !== undefined && _.isString(req.param('notes'))) {
        student.notes = req.param('notes');
      }
      const updatedStudent = await Student.update(
        {
          id: studentId
        },
        student
      ).fetch();

      if (updatedStudent) return updatedStudent;
      throw new Error('Some error occurred. Please contact development team for help.');
    };
    updateStudent()
      .then(res.ok)
      .catch(err => {
        res.status(403).send(err);
      });
  },
  delete: function(req, res) {
    let studentId = req.param('id');

    if (!req.param('id')) {
      return res.badRequest('Id Not Found');
    }
    const processReq = async () => {
      const student = await Student.count({
        id: studentId
      });

      if (student < 1) {
        return new Error('Invalid student Id');
      }
      await Student.update(
        {
          id: studentId
        },
        { activeStatus: 0 }
      );
      return 'Student deleted successfully';
    };

    processReq()
      .then(res.ok)
      .catch(err => res.status(403).send(err));
  }
};
