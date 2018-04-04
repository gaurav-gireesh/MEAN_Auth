/*** We have imports here where we bring in all the modules required for this *****/

const express   =       require('express');

const cors      =       require('cors');

const path      =       require('path');

const bodyParser    =   require('body-parser');

const mongoose      =   require('mongoose');

const passport      =   require('passport');

const users_routes  =   require('./routes/users');

const config        =   require('./config/database');

const db_url        =   config.database;


const port          =   3000;



//Database connectivity check

mongoose.connect(db_url);

mongoose.connection.on('connected', () => {
    console.log("Mongo Database connection established on "+db_url);
});

mongoose.connection.on('error', (err) => {
    console.log("Mongo Database connection Error "+err);
});




//App initialization

const app           =   express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

///Configuring static folder

app.use(    express.static(path.join(__dirname,'public'))   );

//Configuring routes here for the USERS

app.use(    '/users',   users_routes    );


/**********CONFIGURING MIDDLEWARES HERE **********/

app.use(bodyParser.urlencoded({extended:true}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//require calling passport
require('./config/passport')(passport);






//Default route
app.get('/', (req,res) => {
    res.send("Backend running....");
});























//App started and listening on the port
app.listen( port,   () => {

    console.log("Server started gracefully on the port: "+port);
});


