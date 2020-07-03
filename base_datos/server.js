const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');

// const tasks = require('./controllers/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// const sequelize = new Sequelize('proyecto-backed', null, null,{
//   dialect: 'sqlite',
//   storage: './proyecto-backend'
// });

// let db = new sqlite3.Database('proyecto-backend');
app.set('view engine','pug');
app.use(tasksRoutes);



// app.get('/tasks', tasks.home);
//
// app.post('/pendientes', function(req, res){
//   // db.run(`INSERT INTO tasks(description) VALUES(?)`, req.body.description);
//   res.send('Inserción finalizada');
// });

app.listen(3000);
