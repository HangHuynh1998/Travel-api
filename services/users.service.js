const {User, validatePass} = require('../models/users')
const bcrypt = require("bcryptjs");
const getAllUser = () => {
  return new Promise((resolve,reject) =>{
      User.find()
          .select('-password')
          .then(data => {
              return resolve(data)
          })
          .catch(err => {
              return reject(err)
          })
  })
}

const getUser = (id) =>{
    return new Promise ((resolve,reject)=>{
    User.findById(id)
        .select("-password")
        .then(doc =>{
            if(doc == null) throw new Error("User not found");
            resolve(doc);
        })
        .catch(err => {
            reject(err)
        })
    })
}

const updateUser = (id, body) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await User.findById(id)
            if(user == null) throw new Error("User not found");
            const oldAvatar = user.avatar;
            const newAvatar = body.avatar;

            user.avatar = oldAvatar;
            user.set({
                avatar: newAvatar ? newAvatar : oldAvatar,
                isUpdateProfile:true,
            });
            delete body.avatar;
            delete body.background;

            await updateDocument(user, User, body, ['role', 'status','password']);
            await user.save()
            if (user.role == "customer") {
                let customer = await Customer.findOne({ user_id: user._id });
                await updateDocument(customer, Customer, body, ['user_id']);
                await customer.save();
                customerService.getCustomer("user_id", user._id).then(resolve).catch(reject);
            } else if (user.role == "company") {
                let company = await Companie.findOne({ user_id: user._id });
                await updateDocument(company, Companie, body, ['user_id']);
                await company.save();
                companyService.getCompany("user_id", user._id).then(resolve).catch(reject);
            }
            // resolve("Update successful")
        } catch (error) {
            reject(error)
            
        }
    })
}
const changePassword = (id, oldPass, newPass, newPassRetype) => {
    return new Promise((resolve,reject)=>{
        if(!oldPass || !newPass || !newPassRetype) return ({ message: "Bạn cần nhập đầy đủ thông tin"})
        User.findById(id).then(doc => {
            if(doc == null) throw new Error ("User not found")
            if(doc.ChangePassword(oldPass)){
                const {error} = validatePass({data : {password: newPass}});
                if(error){
                    reject(error)
                }else{
                    if(newPass == newPassRetype){
                        doc.set({password: bcrypt.hashSync(newPass,10)});
                        doc.save(err => {
                            if(err){
                                reject(err)
                            }else{
                                resolve("Mật khẩu đã thay đổi thành công!")
                            }
                        })

                    }else{
                        reject({message:"Nhập lại mật khẩu chưa đúng"})
                    }
                }
            }else{
                reject({message:"Mật khẩu cũ chưa đúng"
                })
            }
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    changePassword
}