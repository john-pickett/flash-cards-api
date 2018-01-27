var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/users', (req, res, next) => {
    // console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email
    });
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/users', (req, res, next) => {
    User.find().then((users) => {
        res.send({users});
    })
}, (e) => {
    res.status(400).send(e);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});