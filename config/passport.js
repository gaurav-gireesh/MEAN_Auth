const User = require('../models/user');

const config=require('./database')

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function(passport){

    //setting options
    opts={
           jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
           secretOrKey:config.secret
    };
    passport.use(new JwtStrategy(opts,(jwt_payload,done) => {

        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, ( err,user) =>
    {
        if(err)
        {
            return done(err,false);
        }
        if(!user)
        {
            return done(null,false);
        }
        else{
            return done(null,user);
        }
    });
    }));

};