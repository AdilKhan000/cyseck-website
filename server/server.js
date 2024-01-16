// Import the express library here
const express = require('express');
const cors = require('cors');
// Instantiate the app here
const app = express();

app.use(cors());

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Open a call to app.get() below:
app.get('/', (req, res, next) => {
    res.send("<h1>Hello World</h1>");
});

app.get('/Submit', (req, res, next) => {
    let judgeName = req. query.judgeName;
    let teamName = req. query.teamName;
    let sum = req. query.sum;
    req.send(judgeName + teamName + sum);
});

// Invoke the app's .listen() method below:
app.listen(PORT, () => {
  console.log(`The server is listening to port ${PORT}`);
});