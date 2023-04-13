const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');


let userdb = [
  {
      username:"hazim",
      password:"12345",
      name:"Hazim",
      email:"hazim@gmail.com"   
  },
  {
      username:"abu",
      password:"12345",
      name:"Abu",
      email:"abu@gmail.com"   
  },
  {
      username:"bakar",
      password:"12345",
      name:"Bakar",
      email:"bakar@gmail.com"   
  }
]

function login(username, password) {
  let matchuser = userdb.find(user => user.username == username)

  if(!matchuser) return "User not found!"

  if(matchuser.password == password){
      return matchuser
  }else{
      return "Invalid Password!"
  }
}

function register(username,password,name,email){
  userdb.push({
      username:username,
      password:password,
      name:name,
      email:email
  })
}

function generateToken(userdata){
  const token = jwt.sign(userdata,'inipassword');
  return token
}

function verifyToken(req, res,next){
  let header = req.hearders.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded) {
    if(err) {
      res.send("Invalid Token")
    }

    req.user = decoded
    next()
  });
}

app.get('/', (req, res) => {
  res.send('Helloooooooo')
})

app.get('/test', (req, res) => {
  res.send('Hiiiiiii')
})

app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)
  
  let result = login(req.body.username, req.body.password)
  let token = generateToken(result)
  res.send(token)
})

app.post('/register', (req, res) => {
  console.log(req.body)
  
  let result = register(req.body.username, req.body.password, req.body.name, req.body.mail)
  generateToken(result)
  res.send(token)
})

app.get('/bye', verifyToken, (req, res) => {
  res.send('No Hi')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})