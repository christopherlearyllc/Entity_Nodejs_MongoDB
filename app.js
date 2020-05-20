var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// Express APIs
const entityRouter = require('./routes/entity');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/entity', entityRouter);

var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.set('io',io);
// Will be in db in real world
// const users = [];
// const messages = [];
// let currentId = 0;
// io.on("connection", function(socket) {
//   console.log("LOG:: a user connected");
//   socket.emit("get users list", JSON.stringify(users));
//   socket.emit("get messages history", JSON.stringify(messages));

//   socket.on("message", function(msg) {
//     console.log(
//       "LOG:: message from UserId: " + msg.userId + " --> " + msg.text
//     );
//     const message = {
//       ...msg,
//       timestamp: new Date()
//     };
//     messages.push(message);
//     io.emit("message", JSON.stringify(message));
//   });

//   socket.on("user name added", function(name) {
//     console.log("LOG:: user '" + name + "' entered the room");
//     const newUser = {
//       name,
//       id: ++currentId,
//       isCurrent: false
//     };
//     users.push(newUser);
//     socket.emit("my user added", JSON.stringify(newUser));
//     io.emit("user name added", JSON.stringify(newUser));
//   });

//   socket.on("disconnect", function() {
//     console.log("LOG:: user disconnected");
//   });
// });
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// app.listen(6789);
http.listen(3000, function() {
  console.log("LOG:: listening on *:3000");
});