const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');

const smtpTransporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'usename',
    pass: 'password'
  },
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * send email
 * @type {{sendEmail: Function}}
 * @param {object} params
 * @param {string} params.fromEmail - array of emails or a valid email address or only username e.g. support@example.com or support only
 * @param {string} params.fromName
 * @param {string} params.toEmail
 * @param {string} params.toName
 * @param {string} params.subject
 * @param {string} params.body
 * @param {string} params.[cc]
 * @param {string} params.[bcc]
 * @param {string} params.[inReply]
 * @param {object} params.[headers]
 * @param {array} params.[attachments]
 * @returns {Promise}
 */
module.exports.sendEmail = async function({
  fromEmail = 'fromemail@gmail.com',
  fromName = 'Alora Support',
  toEmail,
  toName,
  subject,
  body,
  bcc,
  replyTo,
  headers,
  attachments
}) {
  const message = {
    from: fromName ? `${fromName} <${fromEmail}>` : fromEmail,
    to: toName ? `${toName} <${toEmail}>` : toEmail,
    // bcc,
    // replyTo,
    // headers,
    // attachments,
    subject,
    // text: sanitizeHtml(body, { allowedTags: [], allowedAttributes: [] }),
    html: body
  };
  return smtpTransporter.sendMail(message);
};
