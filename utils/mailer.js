const ejs = require('ejs')
const nodemailer = require('nodemailer');
const path = require('path')

const MAIL_VLDN_ADMIN = process.env.MAIL_USERNAME;

// Default Mail Transport
const smtpTransport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    // name: process.env.MAIL_NAME,
    port: process.env.MAIL_PORT,
    // secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const EMAIL_TYPE = {
    SEND_REFER_FRIEND_MAIL: 'Welcome to Travel!',
    //SEND_EMAIL_ADMIN: 'TRave thông báo có người gửi yêu cầu tìm việc đến công ty bạn!',
    SEND_EMAIL_APPLY_TOUR: 'Travel thông báo có người đặt tour của công ty bạn! ',
}

function Mailer(from, to) {
    return {
        sendMail: (emailType, bodyData = {}) => new Promise((resolve, reject) => {
            const mailTransport = smtpTransport
            const handleSendMail = (subject, templatePath) => {
                ejs.renderFile(
                    path.resolve(__dirname, templatePath),
                    {
                        ...bodyData
                    }
                ).then(html => {
                    return mailTransport.sendMail({
                        from, // sender address
                        to, // list of receivers
                        subject, // Subject line
                        html
                    }).then(resolve)
                }).catch(reject)
            }
            switch (emailType) {
                case EMAIL_TYPE.SEND_REFER_FRIEND_MAIL: {
                    handleSendMail(
                        emailType,
                        '../views/templates-mail/ReferFriendMail.ejs',
                    )
                    break;
                }
                case EMAIL_TYPE.SEND_EMAIL_ADMIN: {
                    handleSendMail(
                        emailType,
                        '../views/templates-mail/InformSeekerRequestJob.ejs',
                    )
                    break;
                }
                case EMAIL_TYPE.SEND_EMAIL_APPLY_TOUR: {
                    handleSendMail(
                        emailType,
                        '../views/templates-mail/InformSeekerApplyJob.ejs',
                    )
                    break;
                }
                default: reject(new Error('emailType is required'))
            }
        })
    }
}


module.exports = {
    EMAIL_TYPE,
    Mailer,
    MAIL_VLDN_ADMIN
}