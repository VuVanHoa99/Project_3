const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
    try {
        // get user info from id
        const user = await Users.findOne({
            _id: req.user.id
        });
        if(user.role === 0)
            return res.status(400).json({msg: 'Admin recources access denied'});
        
        next();
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = authAdmin;