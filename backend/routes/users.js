const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


//register 

router.post("/register", async (req, res) =>{
    console.log(req.body);  // Log the request body
    try{
        //generate new password 

        const salt = await bcrypt.genSalt(10);
        //hash passowrd 
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password: hashedPassword,
        });


        //save user and send response 
        const user = await newUser.save();
        res.status(200).json(user._id);

    }catch (err) {
        console.log("Error caught in /register route:", err);
    
        // Check for a MongoDB duplicate key error
        if (err.code === 11000) {
            // Log the specific keys that caused the duplicate key error
            console.log("Duplicate key error fields:", err.keyPattern);
    
            // Construct a more detailed error message
            const errorField = Object.keys(err.keyPattern)[0]; // Extract field name
            const errorMessage = `${errorField.charAt(0).toUpperCase() + errorField.slice(1)} already exists`;
            return res.status(400).json(errorMessage);
        }
    
        // Log additional details for other types of errors
        if (err.message) {
            console.log("Error message:", err.message);
        }
        if (err.stack) {
            console.log("Error stack:", err.stack);
        }
    
        // Generic error response
        res.status(500).json("Internal server error");
    }
});


//login 

router.post("/login", async(req, res) =>{
    try{
        //find user 
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json("Wrong username or password!");

        // validate password 
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong username or password!");

        //send succesful response 
        res.status(200).json({_id: user._id, username: user.username });

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})


module.exports = router