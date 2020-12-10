const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const _ = require('lodash');
const async = require('async');
const { validatePass, ROLES } = require("../../models/users");
const User = mongoose.model("User");
const Company = mongoose.model("Companies");
const Customer = mongoose.model("Customer");
const { jwtToken, pareJwtToken } = require("../../utils/func");
const { deleteFilesUploaded } = require("../../utils/file");
const email = process.env.MAIL_USERNAME || 'auth_email_address@gmail.com';
const { companyService,customerService } = require('../../services');
const { authService } = require("../../services");
const { transporter } = require("../../config/middleware/nodemailer");
//const nunjucks = require('nunjucks')

const checkSocalToken = (req, res) => {
    if (req.user.err) {
        res.status(res.CODE.BAD_REQUEST).json({ success: false, message: req.user.err.message, error: req.user.err });
    } else {
        res.sendData({
            jwt_token: jwtToken(req.user.provider),
            user: req.user.provider
        })
    }
}

const checkFacebookToken = (req, res) => {
    checkSocalToken(req, res);
}

const checkGoogleToken = (req, res) => {
    checkSocalToken(req, res);
}

const checkEmailAvailable = (req, res) => {
    authService.checkEmailAvailable(req.body.email)
        .then(data => {
            res.sendData(data)
        })
        .catch(err => {
            res.sendError(err.message);
        })
}

const companyRegister = ({ user_data, company_data }) => {
    /**
     * 1. add to users
     * 2. add to company
     */
    return new Promise(async (rs, rj) => {
        try {
            const user = new User(user_data);
            const company = new Company({
                user_id: user._id,
                ...company_data,
            });
            try {
                await user.save();
                await company.save();
                rs(true);
            } catch (er) {
                Promise.all([
                    User.deleteOne({ _id: user._id }),
                    Company.deleteOne({ _id: company._id }),
                ]).then(_ => {
                    rj(er)
                }).catch(er => {
                    rj(er)
                })
            }
        } catch (er) {
            rj(er);
        }
    })
};

const customerRegister = ({ user_data,customer_data }) => {
    return new Promise(async (rs, rj) => {
        try {
            const user = new User(user_data);
            const customer = new Customer({
                user_id: user._id,
                ...customer_data
            });
            await user.save();
            await customer.save();
            rs(true);
        } catch (er) {
            rj(er);
        }
    })
};

const getUserToken = (user) => {
    let userInfo = user.toJSON();
    delete userInfo.password;
    return jwtToken(userInfo);
}

const getUserProfile = (res, user) => {
    if (user.role.toLowerCase() == "company") {
        companyService.getCompany("user_id", user._id)
            .then(data => {
                res.sendData({
                    token: getUserToken(data)
                });
            })
            .catch(err => {
                res.sendError(err.message)
            })
    } else if (user.role.toLowerCase() == "customer") {
        customerService.getCustomer("user_id", user._id)
            .then(data => {
                res.sendData({
                    token: getUserToken(data)
                });
            })
            .catch(err => {
                res.sendError(err.message)
            })
    } else {
        res.sendData({
            token: getUserToken(user)
        });
    }
}

const login = (req, res) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    User.findOne({ "email": email, role: { "$in": [ROLES[0],ROLES[1], ROLES[2]] } }, (err, user) => {
        if (user && user.checkPassword(password)) {
            getUserProfile(res, user);
        } else {
            res.sendError("Email hoặc mật khẩu chưa đúng.", res.CODE.UNAUTHORIZED);
        }
    })
}
// const loginAdmin = (req, res) => {
//     let email = req.body.email.toLowerCase();
//     let password = req.body.password;
//     User.findOne({ "email": email, role: { "$in": [ROLES[0],ROLES[1], ROLES[2]] } }, (err, user) => {
//         if (user && user.checkPassword(password)) {
//             getUserProfile(res, user);
//         } else {
//             res.sendError("Email hoặc mật khẩu chưa đúng.", res.CODE.UNAUTHORIZED);
//         }
//     })
// }
const social_login = (req, res) => {
    let provider_type = req.user.provider.provider_type;
    let email = req.user.provider.email.toLowerCase();
    User.findOne({ "email": email }, (err, user) => {
        if (!user) {
            res.sendError("User does not exist. Please register with this " + provider_type + " account first !", 401);
        } else {
            if (!user.provider.type) {
                return res.sendError("Please login using your email !");
            }
            else if (user.provider.type != provider_type) {
                return res.sendError("Please login using your " + user.provider.type + " account !");
            } else {
                getUserProfile(res, user);
            }
        }
    })
}

const register = (user_type) => async (req, res) => {
    const afterRegister = async (err_message, code = res.CODE.BAD_REQUEST, errors = []) => {
        if (!err_message) {
            try {
                res.sendData("Register successfully");
            } catch (err) {
                res.sendError(err.message);
            }
        }else {
            res.sendError(err_message)
        }
    }

    try {
        let user_data = {}, company_data = {};
        user_data = {
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 10),
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            description:req.body.description,
            avatar: req.body.avatar,
            birthday: req.body.birthday,
            gender:req.body.gender,
            role: user_type,  
        };

        // check provider
        if (req.body.jwt_token && pareJwtToken(req.body.jwt_token)) {
            let jwt_data = pareJwtToken(req.body.jwt_token);

            if (jwt_data.email !== user_data.email) {
                return afterRegister(`Email is not valid with your ${jwt_data.provider_type.toUpperCase()} access token`);
            }

            user_data = {
                ...user_data,
                name: jwt_data.first_name + jwt_data.last_name,
                email: jwt_data.email.toLowerCase(),
                avatar: jwt_data.avatar,
                provider: {
                    type: jwt_data.provider_type,
                    provider_id: jwt_data.provider_id,
                    provider_access_token: jwt_data.access_token,
                }
            }
        } else {
            user_data = {
                ...user_data,
            }
        }

        switch (user_type) {
            case "company": {
                user_data = {
                    ...user_data,
                    //avatar: req.files.avatar ? req.files.avatar[0].filename : '',
                    address: req.body.address ? req.body.address : "haichau",
                }
                company_data = {
                    ...company_data,
                    name: req.body.name ? req.body.name : "",
                    description: req.body.description ? req.body.description :""
                }
                companyRegister({
                    user_data,
                    company_data,
                }).then(_ => {
                    afterRegister();
                }).catch(er => {
                    afterRegister(er.message);
                })
                break;
            }
            case "customer": {
                customer_data = {
                    birthday: req.body.birthday ? req.body.birthday : "",
                    gender: req.body.gender ? req.body.gender : false
                }
                customerRegister({
                    user_data,
                    customer_data
                }).then(data => {
                    afterRegister();
                }).catch(er => {
                    afterRegister(er.message);
                })
                break;
            }
            default: afterRegister("User role is not allowed!");
        }
    } catch (er) {
        afterRegister(er.message, 401);
    }
}

const getProfile = (req, res) => {
    res.sendData({
        ...req.user,
        token: req.token
    });
}

const forgotPassword = (req, res) => {
    async.waterfall(
        [
            function (done) {
                User.findOne({
                    email: req.body.email.toLowerCase()
                }).exec(function (err, user) {
                    if (user) {
                        done(err, user);
                    } else {
                        res.sendError("User Not Found !", res.CODE.UNPROCESSABLE_ENTITY);
                    }
                });
            },
            function (user, done) {
                // create the random code
                crypto.randomBytes(5, function (err, buffer) {
                    const code = buffer.toString("hex").toUpperCase();
                    done(err, user, code);
                });
            },
            function (user, code, done) {
                User.findOneAndUpdate(
                    { _id: user._id },
                    {
                        reset_password_code: code,
                        reset_password_expires: Date.now() + 1800000
                    },
                    { upsert: true, new: true }
                ).exec(function (err, new_user) {
                    done(err, code, new_user);
                });
            },
            function (code, user, done) {
                let template = nunjucks.render(
                    'config/routes/api/templates/forgot-password-email.html',
                    { code: code, name: user.name }
                )
                let mainOptions = {
                    from: email.toLowerCase(),
                    to: user.email.toLowerCase(),
                    subject: 'Travel - Reset Password Email',
                    text: 'You recieved message from ',
                    html: template,
                }
                transporter.sendMail(mainOptions, function (err) {
                    if (!err) {
                        return res.sendData({
                            message: "Please check your mail box to get your password reset CODE !"
                        });
                    } else {
                        return done(err);
                    }
                });
            }
        ],
        function (err) {
            return res.status(422).json({ message: err });
        }
    );
};


const resetPassword = (req, res) => {
    if (req.body.email) {
        User.findOne({
            email: req.body.email.toLowerCase(),
            reset_password_code: req.body.reset_password_code,
            reset_password_expires: {
                $gt: Date.now()
            }
        }).exec(function (err, user) {
            if (!err && user) {
                const { error } = validatePass(
                    (data = { password: req.body.new_password })
                );
                if (error) {
                    res.sendError(error.message);
                } else {
                    if (req.body.new_password === req.body.new_password_retype) {
                        user.password = bcrypt.hashSync(req.body.new_password, 10);
                        user.reset_password_token = "";
                        user.save(function (err) {
                            if (err) {
                                return res.status(422).send({
                                    message: err
                                });
                            } else {
                                let template = nunjucks.render(
                                    'config/routes/api/templates/reset-password-email.html',
                                    { name: user.name }
                                )
                                let mainOptions = {
                                    from: email.toLowerCase(),
                                    to: user.email.toLowerCase(),
                                    subject: 'Travel - Reset Password Email',
                                    text: 'You recieved message from ',
                                    html: template,
                                }
                                transporter.sendMail(mainOptions, function (err) {
                                    if (!err) {
                                        return res.sendData({
                                            message: "Reset password successful !"
                                        });
                                    } else {
                                        return done(err);
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(422).send({
                            message: "Passwords do not match !"
                        });
                    }
                }
            } else {
                return res.status(400).send({
                    message: "Password reset CODE is invalid or has expired !"
                });
            }
        });
    } else {
        res.sendError({ message: "Please input your email" });
    }

};

module.exports = {
    login,
    social_login,
    register,
    checkFacebookToken,
    checkGoogleToken,
    getProfile,
    forgotPassword,
    resetPassword,
    checkEmailAvailable
};
