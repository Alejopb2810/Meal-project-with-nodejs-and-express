const Meal = require('./meals.model');
const Order = require('./orders.model');
const Restaurant = require('./restaurants.model');
const Review = require('./reviews.model');
const User = require('./users.model');

const initModel = () => {
  /* 1restaurante<--------> M reviews*/
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  /* 1restaurante<--------> M meals*/
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  /* 1meal<--------> 1 order*/
  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  /* 1user<--------> M orders*/
  User.hasMany(Order);
  Order.belongsTo(User);

  /* 1user<--------> M reviews*/
  User.hasMany(Review);
  Review.belongsTo(User);
};
module.exports = initModel;
