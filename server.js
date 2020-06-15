const express = require('express');
const dataStore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listning at ${port}! \nhttp://localhost:3000`));
app.use(express.static('public'));
app.use(express.json({
    limit: "1mb"
}));

const database = new dataStore({
    filename: 'High Scores.db',
    autoload: true
});

app.post("/checkScores", (req, res) => {
    data = req.body;
    score = data.score;
    console.log(`Score received: ${score}`)
    res.json({status: "ok"})
})

app.post("/highScore", (req, res) => {
    data = req.body;
    console.log('Its an High Score🎆🎇🎉')

    database.insert(data, (err, doc) => {
        if (err) {
            console.log("error: " + err)
        } else {
            console.log(`Inserted ${doc.name} with ID ${doc._id}`);
        }
    })
})