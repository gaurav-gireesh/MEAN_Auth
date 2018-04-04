//bringing in modules
const mongoose  =    require('mongoose');
const bcrypt    =   require('bcryptjs');

const UserSchema    =   mongoose.Schema( {
    
    name    :   {   type:String                      },
    username:   {   type:String,    required:true   },
    password:   {   type:String,    required:true   },
    email:      {   type:String,    required:true   }


} );

//exporting the User model
const User  = module.exports=   mongoose.model('User',UserSchema);


//Creating utility functions to interact with the Users model in here
module.exports.getUserById  =   function(id,callback)
{
     User.findById(id,callback);
};


//get user by username

module.exports.getUserByUsername  = function(username,callback)
{
    let query = {username:username};
    User.findOne(query,callback);
};

//Adding a new user to the MongoDB database

module.exports.addUser  =   function(newUser,callback)
{
    bcrypt.genSalt(10, (err,salt) => {

        if(err) throw err;
        bcrypt.hash(newUser.password,salt, (err,hash) => {
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        });
    });

};

module.exports.comparePassword = function(candidatePassword,hash,callback)
{
    bcrypt.compare(candidatePassword,hash,( err, isMatch) => {
        if(err) throw err;
        callback(null,isMatch);
    });
};

