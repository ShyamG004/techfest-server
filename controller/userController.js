const UserData = require("../model/userData");
const { query, validationResult } = require("express-validator");

const validateUser = async (req, res) => {
   await query("email").isEmail().normalizeEmail().run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    const { email } = req.query; 
    try {
        const existingUser = await UserData.findOne({ "userData.email": email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        res.status(201).json({ message: "User Created Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {validateUser};
