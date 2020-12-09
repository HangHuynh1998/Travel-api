const { mailerUtil } = require('../utils')
const { EMAIL_TYPE, Mailer } = mailerUtil
const gigZooAdminEmail = "travel@gmail.com";
const {  SEND_EMAIL_APPLY_TOUR} = EMAIL_TYPE

const sendMailReferFriend = async (  tour_id,
    emailcompany,
    nameCompany,
    nameTour,
    nameCustomer,
    emailCustomer,
    address,
    phone,
    required) => {
     console.log(  tour_id,
        emailcompany,
        nameCompany,
        nameTour,
        nameCustomer,
        emailCustomer,
        address,
        phone,
        required,"o90000000")
        try {
            Mailer(
                `"Travel" <${gigZooAdminEmail}>`,
                emailcompany
            ).sendMail(SEND_EMAIL_APPLY_TOUR, {
                tour_id: tour_id,
                emailcompany: emailcompany,
                nameCompany: nameCompany,
                nameTour: nameTour,
                nameCustomer: nameCustomer,
                emailCustomer: emailCustomer,
                address: address,
                phone: phone,
                required: required,
            });
        } catch (err) {
            console.log('adminSendMailRefer', err);
            reject(err);
        }
}

module.exports = {
    sendMailReferFriend
}