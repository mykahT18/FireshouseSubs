const db = require('../db.js')

exports.create = (data, err, success) => {
  db.order.create(data).then(success).catch(err);
}

exports.findAll = (err, success) => {
  db.order.findAll().then(success).catch(err);
}
exports.find = (payload, err, success) => {
  db.order.find({
    where: payload,
    // Find all relations in sequelize
    include: [{
      all: true,
      nested: true,
    }],
  }).then(success).catch(err);
}

// var orderSchema = mongoose.Schema({
//   product_id: [{type:  mongoose.Schema.Types.ObjectId, ref: 'Product'}],
//   total_price: {type: Number, default: 0}
// })


// orderSchema.methods.getTotalPrice = function(prices){

//   let total = 0      
//   prices.length !== 0 ? prices.forEach(price => total += price ) : 0   
//   return total

// }

// module.exports = mongoose.model('Order', orderSchema)