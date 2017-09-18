const db = require('../db.js')

exports.findAll = (err, success) => {
  db.product.findAll().then(success).catch(err);
}

// module.exports = mongoose.model('Product', productSchema)
