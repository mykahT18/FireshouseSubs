const express = require('express')
const app = express()

const port = 3000

app.listen(process.env.PORT || port , () => {
  console.log('Server on port: '+ port)
})

const myApp = require('./src/app/app')
myApp(app)