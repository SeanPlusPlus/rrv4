import express from 'express'
const app = express()

app.get('/', function (req, res) {
  const msg = 'Hello World!'
  res.send({
    msg,
  })
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
