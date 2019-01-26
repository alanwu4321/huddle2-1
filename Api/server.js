const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const database = {
  users: [{
    id: '123',
    name: 'Andrei',
    email: 'a',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'a'
  }
}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send("connection is established"))

app.post('/signin', (req, res) => {

  console.log(req.body);
  var a = req.body;
  console.log(a.email) 
  console.log(database.users[0].email)
  console.log(a.password)
  console.log(database.secrets.hash)

  if (a.email === database.users[0].email && a.password === database.secrets.hash) {
    res.send(database.users[0]);
  } else {
    res.json('access denied');
  }
})

app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')
})


app.post('/register', (req, res) => {
  id_increment = database.users[database.users.length - 1].id
  id_increment = parseInt(id_increment) +1
  database.users.push({
    id: id_increment.toString(),
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date()
  })
  res.send(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  })
  // res.json('no user')

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
