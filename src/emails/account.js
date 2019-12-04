const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Function that allows us to send wellcome mail when user is first created
// function is created using sendgrid api
const sendWellcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MYEMAIL,
        subject: 'Thanks for joining in!',
        text: `Hello ${name} thank you for joining in. Enjoy free emails.`
    })
}
// Function that allows us to send cancelation mail when users decides to delete their account
// function is vreated using sendgrid api
const sendCancelationMail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.MYEMAIL,
        subject: 'Deleting your account!',
        text: `Sorry to hear ${name}, anything we can do?`
    })
}

module.exports = {
    sendWellcomeMail,
    sendCancelationMail
}