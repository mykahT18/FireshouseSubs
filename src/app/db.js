const Sequelize = require('sequelize')
const NODE_ENV = process.env.NODE_ENV || 'development'

if(NODE_ENV === 'development') {
  require('dotenv').load()
}
console.log(process.env.DB_NAME)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

const order = sequelize.define('order', {
  total_price: {
    type: Sequelize.INTEGER,
  }
});
const product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

product.hasMany(order, {
  foreignKey: 'product_id',
})
sequelize.sync();

exports.sequelize = sequelize;
exports.order = order;
exports.product = product;