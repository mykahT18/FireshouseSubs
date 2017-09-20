const db = require('../db.js')
const Product = db.product

exports.create = (data, err, success) => {
	console.log("HELLLO THERE ", data)
  db.order.create(data
  ).then(success).catch(err);
}

exports.findAll = (err, success) => {
  db.order.findAll().then(success).catch(err);
}
exports.find = (payload, err, success) => {
  db.order.find({
    where: payload,
    // Find all relations in sequelize
    include: [{
    	model: Product,
      all: true,
      nested: true,
    }],
  }).then(success).catch(err);
}
exports.update = () => {
	
}
exports.delete = (id, success, err) => {
	db.order.destroy({
    where: {
        id: id
    }
	}).then(success).catch(err);
}


// orderSchema.methods.getTotalPrice = function(prices){

//   let total = 0      
//   prices.length !== 0 ? prices.forEach(price => total += price ) : 0   
//   return total

// }

// module.exports = mongoose.model('Order', orderSchema)