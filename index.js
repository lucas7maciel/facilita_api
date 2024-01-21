
//require("dotend").config()
const express = require("express")
const bodyParser = require('body-parser')
const load = require("express-load")
const cors = require("cors")

const port = process.env.PORT || 3001 //ver env vars
const  app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//rotas
//ver configurações neessarias
app.get("/", (req, res) => {
    res.send('Running on ' + port)
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

load('controllers')
.then('routes')
.into(app)

module.exports = app