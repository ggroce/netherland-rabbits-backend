const nodemailer = require('nodemailer');
const MAIL_USERNAME = process.env.GOOGLE_GMAIL_EMAIL_USER;
const MAIL_PASSWORD = process.env.GOOGLE_GMAIL_EMAIL_PASSWORD;
const OAUTH_CLIENTID = process.env.GOOGLE_GMAIL_OAUTH_CLIENTID;
const OAUTH_CLIENT_SECRET = process.env.GOOGLE_GMAIL_OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN;
const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS; 
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    type: 'OAuth2', 
    user: MAIL_USERNAME, 
    pass: MAIL_PASSWORD, 
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET, 
    refreshToken: OAUTH_REFRESH_TOKEN, 
  }
});

const handeInquiryMail = (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json('Name and Email required for inquiry');
  }
  
  const name = req.body.name;
  const email = req.body.email;
  const rabbitName = req.body.rabbitName;
  const message = req.body.message;

  //parse data here, then send 

  const mailOptions = {
    from: FROM_EMAIL_ADDRESS, 
    to: TO_EMAIL_ADDRESS, 
    subject: `NetherlandBunnies.com Inquiry from ${name}`, 
    text: `${name}, (${email}), is interested in ${rabbitName}!  
    Here is what they had to say: ${message}`, 
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Netherlandbunnies.com: error sending mail to destination: ", err);
      res.json({
        status: 'error'
      });
    } else {
      console.log("Netherlandbunnies.com: Inquiry email sent from user. ");
      res.json({
        status: 'success'
      });
    }
  });

  //maybe send auto responder on success too: 
  // transporter.sendMail(mail, (err, data) => {
  //   if (err) {
  //     res.json({
  //       status: 'fail'
  //     })
  //   } else {
  //     res.json({
  //        status: 'success'
  //     })
  
  //     transporter.sendMail({
  //       from: "<your email address>",
  //       to: email,
  //       subject: "Submission was successful",
  //       text: `Thank you for contacting us!\n\nForm details\nName: ${name}\n Email: ${email}\n Message: ${message}`
  //     }, function(error, info){
  //       if(error) {
  //         console.log(error);
  //       } else{
  //         console.log('Message sent: ' + info.response);
  //       }
  //     });
  //   }
  // });


}

module.exports = {
  handeInquiryMail: handeInquiryMail
}
