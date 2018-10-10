// import the needed modules
const api_operations = require('./api');
const express = require('express');
const fs = require('fs');
const SI_JSON = require('./database');
const body_parser = require('body-parser')

// initialize the variables
const port = process.env.PORT || 3000;
const app = express();

function init(public_dir) {
    // start the server to listen for requests now
    app
        .use(express.static(public_dir))
        .use(body_parser.urlencoded({extended: true}))
        .get('/simple-icons', api_operations.icon_get)
        .get('/database', function(req, res) {res.status(200).json(SI_JSON)})
        .post('/compile', function(req, res) {res.status(200).json({response: "OK"})})
        .listen(port, () => {
            console.log(`Server opened up at port ${port}.`)        
        })
}

function stop(process_code) {
    process.exit(process_code, (code) => {
        console.log(`Server exiting with code ${code}.`);
    });
}

module.exports = {
    port,
    init,
    stop
}