const USER = require("../models/user");

const addUser = async (req, res) => {
    try {
        const {email, password} = req.body;
    const user = await USER.create({
        email: email,
        password: password,
    });
    res.status(201).json({
        type:"success",
        message: "User Created!!",
        user
    })
    } catch (error) {
        res.status(500).json({
            type:"error",
            error: error.message
        })
    }
    
}

module.exports = addUser;