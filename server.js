const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectflash = require('connect-flash');
const morgan = require('morgan');

// create server
app.listen(port, () => console.log(`Listening on port ${port}`));

// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(connectflash());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// logger
app.use(morgan('dev'));

// setup REST routes
app.post('/login', function(req, res) {

});
// API calls
app.get('/api/hello', (req, res) => {
    console.log(req.body);

    res.send({
        express: 'Hello From Express'
    });
});

app.use('/api/analyser', require(path.join(__dirname, './server/analyser'))); //When it is /api then it will go to getData


if (process.env.NODE_ENV === 'production') {
    console.log("-------------------------------------");
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// setup mongoose connection

// let mongoURL = 'mongodb://127.0.0.1:27017/rig_db_dsc';

// mongoose.connect(mongoURL, {
//     useNewUrlParser: true
// });

// mongoose.connection.on('connected', function() {
//     console.log('mongoose is now connected to ', mongoURL);

//     mongoose.connection.on('error', function(err) {
//         console.error('error in mongoose connection: ', err);
//     });

//     mongoose.connection.on('disconnected', function() {
//         console.log('mongoose is now disconnected.');
//     });

//     process.on('SIGINT', function() {
//         mongoose.connection.close(function() {
//             console.log('mongoose disconnected on process termination');
//             process.exit(0);
//         });
//     });
// });