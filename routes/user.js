const UserModel = require("../model/User");

const getUser = async  (req, res) => {
const user = await UserModel.find().exec()
return res.status(400).json({user: 
    user
})
}
 module.exports = getUser