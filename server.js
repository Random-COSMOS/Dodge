const express = require('express');
const dataStore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at ${port}! \nhttp://localhost:3000`));
app.use(express.static('public'));
app.use(express.json({
    limit: "1mb"
}));

const db = new dataStore({
    filename: 'High Scores.db',
    autoload: true
});

app.post("/checkScores", (req, res) => {
    score = req.body.score;
    console.log(`Score received: ${score}`)

    db.find({
        "score": {
            $gt: score
        }
    }, (err, doc) => {
        doc.length < 10 ? highScore = true : highScore = false
        res.json({
            status: "ok",
            score: score,
            highScore: highScore,
        })
    })
})

app.post("/highScore", (req, res) => {
    data = req.body;
    console.log('Its an High Score')

    db.insert(data, (err, doc) => {
        err ? console.log(err) : console.log(doc)
    })

    db.find({}).sort({
        score: 1
    }).exec((err, doc) => {
        console.log(doc)
        console.log(doc.length)

        if (doc.length > 10) {
            id = doc[0]._id
            db.remove({
                _id: id
            }, (err, numRemoved) => {
                err ? console.log(err) : null
            })
        }
    })
})