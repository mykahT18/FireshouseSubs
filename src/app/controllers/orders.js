const express = require('express')
const router = express.Router()

// Importing Models
const Product = require('../models/Product.js')
const Order = require('../models/Order.js')

module.exports = function(app){
	app.use('/api/v1', router)

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Get Orders
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/order', (req, res) => {
  console.log(Order)    
    Order.findAll((errorData) => {
      res.status(500).json(errorData)
    }, (successData) => {
      res.status(200).json(successData)
    })
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Get Products
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/products', (req, res) => {
    Product.findAll((errorData) => {
      res.status(500).json(errorData)
    }, (successData) => {
      res.status(200).json(successData)
    })
  })
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Getting an order by Id
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/order/:orderID', (req, res) => {
    const query = {id: req.params.orderID};
    Order.find(query, (errorData) => {
      res.status(500).json(errorData)
    }, (successData) => {
      res.status(200).json(successData)
    })
  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Create New Order
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.post('/order', (req, res) => {
    const newOrder = {
      total_price: 60,
      products: [
        {id: 1},
      ]
    }
    Order.create(newOrder, (errorData) => {
      res.status(500).json(errorData)
    }, (successData) => {
      res.status(200).json(successData)
    })
  })
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Getting an order by Id and updating it.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.put('/order/:orderID', (req, res) => {
    const updatedData = {product_id: req.body}
    // Order.update(updatedData)
  })
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Deleting by the orderID.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.delete('/order/:orderID', (req, res) => {
    const id = req.params.orderID
    Order.delete(id, (successData)=>{
      res.status(200).json(successData)
     }), (errorData) => {
      res.status(500).json(errorData)
    }
  })
  return router
}

