const {usersService} = require('../../services')

const getAllUsers = (req,res) => {
    usersService.getAllUser()
    .then(data => {
        res.sendData(data);
    })
    .catch(err => {
        res.sendData(err.message)
    })
}

const getUser = (req,res) => {
    let id = req.user.user_id._id;
    usersService.getUser(id)
    .then (data => {
        res.sendData(data)
    })
    .catch(err => {
        res.sendData(err.message, res.CODE.BAD_REQUEST)
    })
}

const updateUser = (req, res) => {
    let id = req.user.user_id._id;
    usersService.updateUser(id, {
        ...req.body,
    })
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })
}

const changePassword = (req, res) => {
    let id = req.user.user_id._id;
    let oldPass = req.body.old_pass;
    let newPass = req.body.new_pass;
    let newPassRetype = req.body.new_pass_retype;
    userService.changePassword(id, oldPass, newPass, newPassRetype)
        .then(data => {
            res.sendData(data);
        })
        .catch(err => {
            res.sendError(err.message);
        })

}
module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    changePassword
}