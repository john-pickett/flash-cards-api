const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Lesson} = require('./models/lesson');
var {Score} = require('./models/score');
var {Deck} = require('./models/deck');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
  });

// User Routes
app.get('/users', (req, res, next) => {
    User.find().then((users) => {
        res.send({users});
    });
}, (e) => {
    res.status(400).send(e);
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


// Lesson Routes
app.get('/lessons', (req, res, next) => {
    // console.log('getting /lessons')
    Lesson.find().then((lessons) => {
        // console.log(JSON.stringify(lessons))
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

app.post('/lessons', (req, res, next) => {
    var lesson = new Lesson({
        title: req.body.title,
        cards: req.body.cards,
        answers: req.body.answers,
        length: req.body.length,
        timer: req.body.timer,
        high_scores: req.body.high_scores
    });
    lesson.save().then((doc) => {
        res.send(doc);
        console.log('new lesson posted')
    }, (e) => {
        res.status(400).send(e);
    });
}, (e) => {
    res.status(400).send(e);
});

// only allows for updates to high scores currently
app.patch('/lessons/:id', (req, res) => {
    console.log('patching lesson ' + JSON.stringify(req.body) + " " + req.params.id);
    var id = req.params.id;
    var body = _.pick(req.body, ['high_scores']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Lesson.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (doc) => {
        if (!doc) {
            return res.status(400).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    })
})

// Scores Routes
app.get('/scores', (req, res, next) => {
    Score.find().then((scores) => {
        res.send({scores});
    })
}, (e) => {
    res.status(400).send(e);
});

app.post('/scores', (req, res, next) => {
    var score = new Score({
        name: req.body.name,
        score: req.body.score
    });
    score.save().then((doc) => {
        console.log('score posted')
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
}, (e) => {
    res.status(400).send(e);
});

app.listen(port, () => {
    console.log(`started up at ${port}`);
});

// Deck Routes
app.get('/decks', (req, res) => {
// accessKeyId: process.env.S3_KEY,
// secretAccessKey: process.env.S3_SECRET

    const unCreds = {
        appId: '1',
        appSecret: '2'
    }


    Deck.find().then((decks) => {
        res.send({
            decks,
            unCreds
        });
    })
}, (e) => {
    res.status(400).send(e);
});

app.post('/decks', (req, res) => {
    var deck = new Deck({
        title: req.body.title,
        cards: req.body.cards,
        scores: req.body.scores
    });
    deck.save().then((doc) => {
        res.send(doc);
        console.log('new deck saved')
    })
}, (e) => {
    res.status(400).send(e);
});