module.exports = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.user_id) {
            if (req.user.user_id.role === role) {
                return next();
            } else {
                res.sendError('Chỉ người tìm tour mới thực hiện được hành động này!');
            }
        } else {
            res.sendError('Unauthorized user!');
        }
    }

}