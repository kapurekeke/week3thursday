const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Helloooooooo')
})

app.get('/test', (req, res) => {
  res.send('Hiiiiiii')
})

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)
  res.send('Login')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})