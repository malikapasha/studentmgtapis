/**
 * WorkspaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    const { name, ownerName, userId } = req.allParams();
    if (!name || !_.isString(name)) {
      return res.badRequest('name required');
    }
    if (!ownerName || !_.isString(ownerName)) {
      return res.badRequest('ownerName is required');
    }
    const createWorkspace = async () => {
      const checkUser = await User.count({
        id: userId
      });
      if (checkUser === 0) {
        throw new Error('user not found');
      }
      const newWorkspace = await Workspace.create({
        name,
        ownerName,
        owner: userId
      }).fetch();
      if (newWorkspace) return newWorkspace;
      else throw new Error('Some error occurred. Please contact support team for help. ');
    };

    createWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  update: function(req, res) {
    const { name, ownerName, userId } = req.allParams();
    let workspace = {};
    if (name !== undefined && _.isString(name)) {
      workspace.name = name;
    }
    if (ownerName !== undefined && _.isString(ownerName)) {
      workspace.ownerName = ownerName;
    }
    const updateWorkspace = async () => {
      const checkUser = await User.count({
        id: userId
      });
      if (checkUser === 0) {
        throw new Error('user not found');
      }
      const updatedwp = await Workspace.update(
        {
          owner: userId
        },
        {
          name,
          ownerName
        }
      ).fetch();
      if (updatedwp) return updatedwp;
      else throw new Error('Some error occurred. Please contact support team for help. ');
    };

    updateWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  findWSOfUser: function(req, res) {
    const { userId } = req.allParams();
    console.log('TCL: userId', userId);
    if (!userId || !_.isString(userId)) {
      return res.badRequest('userId required');
    }
    const getWorkspace = async () => {
      return await Workspace.find({ where: { owner: userId } }).populate('members');
    };
    getWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  addMember: function(req, res) {
    console.log('mem');
    const { email, student, clss, attendance, userId } = req.allParams();
    const getWorkspace = async () => {
      const userCount = await User.count({ where: { email: email } });
      const workspace = await Workspace.find({ where: { owner: userId } });
      const body = `
       You are invited to ${workspace[0].name} workspace on alora kindly click <a href="alora.com/link">here</a> to access.
      `;
      EmailService.sendEmail({
        toEmail: email,
        subject: 'Workspace invitation',
        body
      });
      await Member.findOrCreate(
        { email, workspace: workspace[0].id },
        {
          email,
          workspace: workspace[0].id,
          activeStatus: userCount ? 1 : 0,
          studentPermission: student,
          classPermission: clss,
          attendancePermission: attendance
        }
      );
      return await Workspace.find({ where: { owner: userId } }).populate('members');
    };
    getWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  updateMember: function(req, res) {
    const { email, student, clss, attendance, userId } = req.allParams();
    const getWorkspace = async () => {
      const workspace = await Workspace.find({ where: { owner: userId } });
      await Member.update(
        { email, workspace: workspace[0].id },
        {
          studentPermission: student,
          classPermission: clss,
          attendancePermission: attendance
        }
      );
      return await Workspace.find({ where: { owner: userId } }).populate('members');
    };
    getWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  deleteMember: function(req, res) {
    const { email, userId } = req.allParams();
    console.log('TCL: email, userId', email, userId);

    const processReq = async () => {
      const workspace = await Workspace.find({ where: { owner: userId } });
      if (!workspace.length) {
        throw new Error('workspace not found');
      }

      await Member.destroy({ email, workspace: workspace[0].id });
      return 'Member deleted successfully';
    };

    processReq()
      .then(res.ok)
      .catch(err => res.status(403).send(err));
  },
  memberWorkspace: function(req, res) {
    const { email } = req.allParams();
    if (!email || !_.isString(email)) {
      return res.badRequest('email is required');
    }
    const getWorkspace = async () => {
      const member = await Member.find({ where: { email: email } }).populate('workspace');
      return member;
    };
    getWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  },
  switchWorkspace: function(req, res) {
    const { workspaceId, email } = req.allParams();
    if (!email || !_.isString(email)) {
      return res.badRequest('email is required');
    }
    const processWorkspace = async () => {
      if (workspaceId) {
        const workspace = await Workspace.findOne({ id: workspaceId }).populate('owner');
        const member = await Member.update({ email }, { activeStatus: 1 }).fetch();
        if (!workspace) throw new Error('workspace not found');
        const rsp = {
          user: workspace.owner,
          token: jwToken.issue(
            {
              id: workspace.owner.id
            },
            '7 days'
          ),
          access: member[0]
        };
        return rsp;
      } else {
        const user = await User.findOne({
          email
        }).populate('license', { where: { activeStatus: 1 } });
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
      }
    };
    processWorkspace()
      .then(res.ok)
      .catch(err => res.status(400).send(err));
  }
};
