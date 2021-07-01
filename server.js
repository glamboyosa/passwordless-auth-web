const express = require('express')
const Bundler = require('parcel-bundler')

const app = express()
const bundler = new Bundler('./client/index.html', {})

app.use(express.json())

// create PhoneCheck
app.post('/api/phone-check', async (req, res) => {
  res.json({})
})

// get PhoneCheck response
app.get('/api/phone-check', async (req, res) => {
  res.json({})
})

app.use(bundler.middleware())

// setup server
app.listen(4000, () => {
  console.log('listening on PORT 4000')
})
