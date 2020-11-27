const { contactService } = require("../../services");
const sendReferFriendMail = async (req, res) => {
    const { email,subject,content } = req.body;

    await contactService.sendMailReferFriend(email,subject,content)
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