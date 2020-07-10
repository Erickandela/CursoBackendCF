const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');
const socketio = require('socket.io');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationRoutes = require('./routes/registration_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

// const tasks = require('./controllers/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// const sequelize = new Sequelize('proyecto-backed', null, null,{
//   dialect: 'sqlite',
//   storage: './proyecto-backend'
// });

// let db = new sqlite3.Database('proyecto-backend');
app.set('view engine','pug');

let sessionConfig = {
  secret: ['12asdfgf', '1324rtgved3243'],
  saveUninitialized: false,
  resave: false
}

if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
  sessionConfig['store'] = new (require('connect-pg-simple')(session))();
}

app.use(session(sessionConfig));

app.use(findUserMiddleware);
app.use(authUser);
app.use(tasksRoutes);
app.use(registrationRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/', function (req, res) {
  res.render('home', {
    user: req.user
  });
})

// app.get('/tasks', tasks.home);
//
// app.post('/pendientes', function(req, res){
//   // db.run(`INSERT INTO tasks(description) VALUES(?)`, req.body.description);
//   res.send('Inserción finalizada');
// });

let server = app.listen(process.env.PORT || 3000);
let io = socketio(server);
let sockets = {};

let userCount = 0;

io.on('connection', function(socket) {
  let userId = socket.request._query.loggeduser;
  if(userId) sockets[userId] = socket;

  console.log(sockets);
  // refresh users in real time
  userCount ++ ;
  io.emit('count_updated', { count: userCount});

  socket.on('new_task', function(data){
    if(data.userId){
      let userSocket = sockets[data.userId];
      if(!userSocket) return;

      userSocket.emit('new_task', data);
    }
  })


  socket.on('disconnect', function(){
    Object.keys(sockets).forEach(userId=>{
      let s = sockets[userId];
      if(s.id == socket.id) sockets[userId] = null;
    });
    console.log(sockets);
    userCount --;
    io.emit('count_updated', { count: userCount });
})
});

const client = require('./realtime/client');
