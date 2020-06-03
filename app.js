'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),

const dotenv = require('dotenv')
dotenv.config()

const app = express();
// header types handel here
app.use(bodyParser.json({limit: '50mb'}));
app.use( bodyParser.urlencoded( {extended:false,limit: '50mb'} ) )

// handle cors setting here
app.use(cors());

// importing required files for routes
const db = require('./server/config/db.js');
console.log("imported config successfully");


const mainPageRouter = require('./server/routes/mainPage.js');
console.log("imported all routes");

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    // logger('morgan enabled');
}

// default route for app
app.get('/', (req, res) => {
    res.send("Node Server is up and running")
})

// routes is handled here
app.use('/mainPage', mainPageRouter);
console.log("defined all routes");

const PORT = process.env.PORT || 8080;



// //drop and resync with { force: true }
/*db.sequelize.sync({ logging: false, force: false }).then(() => {
    console.log("Models are in sync with db")
}).catch((error) => {
    console.log("this error came while sync to database", error);
});
*/
// check if connection is established with db and start server
console.log("trying to test connection for db")
db.sequelize.authenticate()
    .then(function() {
        console.log("Connected to database !!!");
        app.listen(PORT, () => {
            console.log('Express listening on port:', PORT);
        });
    })
    .catch(function(err) {
        console.log("SOMETHING WENT WRONG", err);
    })
    .done();
