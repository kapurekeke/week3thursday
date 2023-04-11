const express = require('express')
const app = express()
const port = 3000

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

  res.send(result)
})

app.post('/register', (req, res) => {
  console.log(req.body)
  
  let result = register(req.body.username, req.body.password, req.body.name, req.body.mail)

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})