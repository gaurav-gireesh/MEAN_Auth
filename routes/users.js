const express   =   require('express');

const router    =   express.Router();

const User = require('../models/user'); // getting access to User model and utility methods

const config = require('../config/database'); //getting the key to sign the json token

const jwt = require('jsonwebtoken');  //for generating jwt to the user sending module

const passport = require('passport');

/*********************Routes*************************/

//User register route-
router.post('/register',(req,res,next) => { 
        console.log(req.body);
    let newUser = new User(
        {
            name:   req.body.name,
            username:   req.body.username,
            password:req.body.password,
            email:req.body.email
        }
    );

    User.addUser(newUser, (err,user) => {

        if(err)
        {
            res.json({msg:"Error in registering the user",status:"Failure"});
        }
        else
        {
            res.json({msg:" Successful registration of user!",status:"Success"});
        }
    });
});


//User authenticate route
router.post('/authenticate', (req,res,next) => { 

    //Here we will check with the incoming username and password

    let username = req.body.username;
    let password = req.body.password;
    
    //try and get the user from your utiility methods
    User.getUserByUsername(username,(err,user) => { 
        if(err)
        {
            return res.json({success:false, msg:"The user cannot be found!"});


        }
        User.comparePassword(password,user.password,(err,isMatch) =>
        {


                if(err) throw err;
                if(!isMatch)
                {
                    return res.json({success:false,msg:"Wrong credentials"});
                }

                else{
                    //create token and send the user detail back
                    console.log("Password is a match");
                    const token = jwt.sign(user.toJSON(),config.secret,{expiresIn:684000});
                    res.json(
                        {
                            token:"JWT "+token,
                            user:{
                                name:user.name,
                                id:user._id,
                                email:user.email,
                                username:user.username
                            }
                        }
                    );
                }
        });

    });
});


//User profile

router.get('/profile',passport.authenticate('jwt',{session:false}), (req,res,next) => { 

    res.json({user:req.user});
});





module.exports = router;