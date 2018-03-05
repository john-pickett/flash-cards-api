var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Lesson} = require('./models/lesson');
var {Score} = require('./models/score');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// temp comment

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
    });
}, (e) => {
    res.status(400).send(e);
});

app.post('/lessons', (req, res, next) => {
    var lesson = new Lesson({
        title: req.body.title,
        cards: req.body.cards,
        answers: req.body.answers,
        length: req.body.length,
        timer: req.body.timer
    });
    lesson.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}, (e) => {
    res.status(400).send(e);
});

app.get('/lessons', (req, res, next) => {
    Lesson.find().then((lessons) => {
        res.send({lessons});
    })
}, (e) => {
    res.status(400).send(e);
});

app.get('/lessons/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

   Lesson.findById(id).then((lesson) => {
    if (!lesson) {
        return res.status(404).send();
    }

    res.send({lesson});
   }).catch((e) => {
    res.status(400).send();
   })
});

app.post('/scores', (req, res, next) => {
    console.log('score posted')
    var score = new Score({
        name: req.body.name,
        score: req.body.score
    });
    score.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
}, (e) => {
    res.status(400).send(e);
});

app.get('/scores', (req, res, next) => {
    Score.find().then((scores) => {
        res.send({scores});
    })
}, (e) => {
    res.status(400).send(e);
});

app.listen(port, () => {
    console.log(`started up at ${port}`);
});