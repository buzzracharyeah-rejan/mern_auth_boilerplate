const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, EMAIL_FROM } = require('../configs');


sgMail.setApiKey(SENDGRID_API_KEY); 

const triggerEmail = async emailOpts => {
  const msg = {
    to: emailOpts.emailTo, 
    from: EMAIL_FROM, 
    subject: emailOpts.subject, 
    text: "test mail", 
    html: emailOpts.html
  }

  return await sgMail.send(msg)
}

module.exports = { triggerEmail };
