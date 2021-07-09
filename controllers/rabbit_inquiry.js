const sgMail = require('@sendgrid/mail')
const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS; 
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;


const handleRabbitInquiry = (req, res) => {
  if (!req.body.custName || !req.body.custEmail || !req.body.custMessage) {
    return res.status(400).json('Name, Email, and short message required for inquiry');
  }
  
  const custName = req.body.custName;
  const custEmail = req.body.custEmail;
  const custMessage = req.body.custMessage;
  const rabbitName = req.body.rabbitName;

  //parse data here, then send 

  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    from: FROM_EMAIL_ADDRESS,
    to: TO_EMAIL_ADDRESS,
    subject: `NetherlandBunnies.com Inquiry from ${custName}`,
    text: `${custName}, (${custEmail}), is interested in ${rabbitName}! \n\n`
      + `Here is what they had to say: \n    ${custMessage}`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log("Netherlandbunnies.com: Inquiry email sent from user. ");
      res.json({
        status: 'success'
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        status: 'error'
      });
    });
}

module.exports = {
  handleRabbitInquiry: handleRabbitInquiry
}
