var express = require('express');
var app = express();
var fs = require("fs");

var sql = require("mssql");
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

// config for your database
var config = {
    user: 'sa',
    password: 'xxxxx',
    server: 'xxxx',
    database: 'xxxx'
};

app.get('/listGames', asyncWrapper(getGames));
app.get('/gameByID/:id', asyncWrapper(getGameByID));
app.post('/addGame', asyncWrapper(addGame));

function asyncWrapper(fn) {
    return (req, res, next) => {
        return fn(req, res, next).catch(next)
    }
}

async function getGames(req, res) {
    const pool = await sql.connect(config)
    const result = await pool.request().query("select * from GameCatalog")
    if (!result) {
        throw new NotFound("No games exist.")
    }
    return res.json(result)
}

async function getGameByID(req, res) {
    const pool = await sql.connect(config)
    console.log(req.params.id);
    const result = await pool.request().query(`select * from GameCatalog where GameID = '${req.params.id}';`);
    if (!result) {
        throw new NotFound("No games exist.")
    }
    return res.json(result)
}

async function addGame(req, res) {
    console.log(req.body);
}

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
