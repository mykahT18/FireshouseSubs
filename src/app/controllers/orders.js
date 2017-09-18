const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();

// Importing Models
const Product = require('../models/Product.js')
const Order = require('../models/Order.js')

module.exports = function(app){
	app.use('/api/v1', router);

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Get Orders
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/order', (req, res) => {    
    Order.findAll((errorData) => {
      console.error(errorData);
      res.status(500).json(errorData);
    }, (successData) => {
      console.log(successData);
      res.status(200).json(successData);
    })
  });

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Get Products
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.get('/products', (req, res) => {
    Product.findAll((errorData) => {
      console.error(errorData);
      res.status(500).json(errorData);
    }, (successData) => {
      console.log(successData);
      res.status(200).json(successData);
    })
  })

  router.get('/order/:orderID', (req, res) => {
    // console.log(req.params.orderID)
    const where = {id: req.params.orderID};
    Order.find(where, (errorData) => {
      console.error(errorData);
      res.status(500).json(errorData);
    }, (successData) => {
      console.log(successData);
      res.status(200).json(successData);
    })

  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Create New Order
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.post('/order', (req, res) => {
    const newOrder = {
      product_id: 4,
      total_price: 6.99
    }

    Order.create(newOrder, (errorData) => {
      console.error(errorData);
      res.status(500).json(errorData);
    }, (successData) => {
      console.log(successData);
      res.status(200).json(successData);
      console.log('yoyoyoy')
    })

  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Getting an order by Id and updating it.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.put('/order/:orderID', (req, res) => {
    console.log("Update Order now: ", req.body )
    let arryTotal = []
    let i = 0
    req.body.product_id.forEach((id) => {
      Product.findById(id, (err, product) => {
        i++
        arryTotal.push(product.price)
        if(i === req.body.product_id.length){
         Order.findOne({_id: req.params.orderID}, (err, order) => {
            order.total_price = order.getTotalPrice(arryTotal)
            order.product_id = req.body.product_id
            console.log("3: ", order)
            order.save((err, order) => {
              if(err) return res.send(err);
              console.log("hello")
              res.json(order);
            });
          })
        }
      })
    })    
  })

  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  // Deleting by the orderID.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  router.delete('/order/:orderID', (req, res) => {
    Order.remove({_id: req.params.orderID}, (err) => {
      console.log("DELETE THIS NOW!!!! ", req.params.orderID )
      res.sendStatus(200);
    })
  })

  return router;
}

