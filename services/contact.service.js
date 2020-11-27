const { mailerUtil } = require('../utils')
const { EMAIL_TYPE, Mailer } = mailerUtil
const gigZooAdmin = process.env.MAIL_USERNAME_ADMIN;
const gigZooAdminEmail = process.env.MAIL_USERNAME;
const { SEND_REFER_FRIEND_MAIL,SEND_EMAIL_ADMIN } = EMAIL_TYPE
const APP_DOMAIN = require("../config/index").APP_DOMAIN;
const getUrlRefer = APP_DOMAIN + `/login`
const sendMailReferFriend = async (email,subject,content) => {
    try {
        try {
            Mailer(
                `"Travel" <${gigZooAdminEmail}>`,
                email
            ).sendMail(SEND_REFER_FRIEND_MAIL, {
                urlRefer:getUrlRefer
            });
            Mailer(
                `"Travel" <${gigZooAdminEmail}>`,
                gigZooAdmin
            ).sendMail(SEND_EMAIL_ADMIN, {
                email:email,
                subject:subject,
                content:content
            });
        } catch (err) {
            console.log('adminSendMailRefer', err);
            reject(err);
        }
    } catch (error) {
        console.log('sendMailReferFriend', error);
    }
}

module.exports = {
    sendMailReferFriend
}