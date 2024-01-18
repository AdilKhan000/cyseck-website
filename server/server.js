// Import the express library here
const express = require('express');
const cors = require('cors');
const {Client} = require('pg');
// Instantiate the app here
const app = express();

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "postgres"
})

client.connect();
app.use(cors());

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Open a call to app.get() below:
app.get('/', (req, res, next) => {
    res.send("<h1>Hello World</h1>");
});

app.get('/Submit', (req, res, next) => {
    let judgeName = req.query.judgename;
    let teamName = req.query.teamname;
    let sum = Number(req.query.sum);
    client.query(`INSERT INTO users (judgename, teamname, score) VALUES ($1, $2, $3);`,
    [judgeName,teamName,sum],(err, ret)=>{
    if(!err){
      res.json({error: 'no errors'});
    }
    else{
      res.json({error: err.message});
    }
    
  })
    
});
app.get('/retrieve', async (req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM users');
    const data = response.rows;
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Invoke the app's .listen() method below:
app.listen(PORT, () => {
  console.log(`The server is listening to port ${PORT}`);
});