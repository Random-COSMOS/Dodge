const express = require('express');
const dataStore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listning at ${port}!`));
app.use(express.static('public'));
app.use(express.json({
    limit: "1mb"
}));

const database = new dataStore({
    filename: 'High Scores.db',
    autoload: true
});
database.remove({}, {
    multi: true
});
database.loadDatabase();

app.post("/checkScores", (req, res) => {
    data = req.body;
    score = data.score;

})

app.post("/scores", (req, res) => {
    data = req.body;

    console.log(data)
})

