const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');

const { db } = require('../database/db');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const { orderRouter } = require('../routes/orders.router');
const { mealRouter } = require('../routes/meals.router');
const { restaurantRouter } = require('../routes/restaurants.router');
const { userRouter } = require('../routes/users.router');
const { authRouter } = require('../routes/auth.router');
const initModel = require('./init.model');

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT || 4000;

    // this.limiter = rateLimit({
    //   max: 100,
    //   windowMs: 60 * 60 * 1000,
    //   message: 'Too many request from this IP, please try again in an hour!',
    // });

    this.paths = {
      auth: '/api/v1/auth',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
      restaurant: '/api/v1/restaurants',
      user: '/api/v1/users',
    };
    //LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    //INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());

    this.app.use(xss());

    this.app.use(hpp());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    // this.app.use('/api/v1', this.limiter);
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  routes() {
    //utilizar las rutas de autenticacion
    this.app.use(this.paths.auth, authRouter);
    //utilizar las rutas de meals
    this.app.use(this.paths.meal, mealRouter);
    //utilizar las rutas de orders
    this.app.use(this.paths.order, orderRouter);
    //utilizar las rutas de restaurants
    this.app.use(this.paths.restaurant, restaurantRouter);
    //utilizar las rutas de users
    this.app.use(this.paths.user, userRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//EXPORTAMOS EL SERVIDOR
module.exports = Server;
