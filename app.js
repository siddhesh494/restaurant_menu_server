require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Route = require('./boot/route')
const Middleware = require('./boot/middleware')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerDefinition = {
  openapi: '3.0.0',  // You can also use 'swagger: "2.0"' for older versions
  info: {
    title: 'My API',   // Title of the API
    version: '1.0.0',  // Version of the API
    description: 'A simple Express API', // Description of the API
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1', // URL of the API
    },
  ]
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/v1/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


(async () => {
  try {
    const route = new Route()
    const middleware = new Middleware()

    
    middleware.init(app)
    console.log("custom middleware added successfully")

    route.init(app)
    console.log("Route added successfully")
    // await mongoHelper.initConnection()
    // console.log("MongoDB connected")

  } catch (error) {
    setTimeout(() => {
      process.exit(1)
    }, 1000)
  }
})()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
