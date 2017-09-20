const db = require('../db.js')

exports.findAll = (err, success) => {
  db.product.findAll().then(success).catch(err);
}
// exports.find = (payload, err, success) => {
//   db.product.find({
//     where: payload,
//     // Find all relations in sequelize
//     include: [{
//       all: true,
//       nested: true,
//     }],
//   }).then(success).catch(err);
// }
