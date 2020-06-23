const express = require('express');
const dataStore = require('nedb');
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer()
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listning at ${port}! \nhttp://localhost:3000`));
app.use(express.static('public'));
app.use(express.json({
    limit: "1mb"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(upload.array());


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
        doc.length != 10 ? highScore = true : highScore = false
        res.json({
            status: "ok",
            score: score,
            highScore: highScore
        })
    })
})

app.post("/test", (req, res) => {
    console.log(req.body)
    res.send('okay')
})

// app.post("/highScore", (req, res) => {
//     data = req.body;
//     console.log('Its an High Score')

//     database.insert(data, (err, doc) => {
//         if (err) {
//             console.log("error: " + err)
//         } else {
//             console.log(`Inserted ${doc.name} with ID ${doc._id}`);
//         }
//     })
// })