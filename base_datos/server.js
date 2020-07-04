const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationRoutes = require('./routes/registration_routes');
const sessionsRoutes = require('./routes/sessions_routes');

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

app.use(session({
  secret: ['12asdfgf', '1324rtgved3243'],
  saveUninitialized: false,
  resave: false
}));

app.use(findUserMiddleware);
app.use(authUser);
app.use(tasksRoutes);
app.use(registrationRoutes);
app.use(sessionsRoutes);

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

app.listen(3000);
