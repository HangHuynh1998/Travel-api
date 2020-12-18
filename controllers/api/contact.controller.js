const { contactService } = require("../../services");
const sendReferFriendMail = async (req, res) => {
    const {  
        tour_id,
        emailcompany,
        nameCompany,
        nameTour,
        nameCustomer,
        emailCustomer,
        address,
        phone,
        required, } = req.body;
    await contactService.sendMailReferFriend(  tour_id,
        emailcompany,
        nameCompany,
        nameTour,
        nameCustomer,
        emailCustomer,
        address,
        phone,
        required,)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}

module.exports = {
    sendReferFriendMail
}