const express = require('express')
const Bundler = require('parcel-bundler')

const app = express()
const bundler = new Bundler('./client/index.html', {})

app.use(express.json())

// create PhoneCheck
app.post('/api/phone-check', async (req, res) => {
  console.log('POST /api/phone-check', req.body)
  res.json({})
})

// get PhoneCheck response
app.get('/api/phone-check/:checkId', async (req, res) => {
  console.log('GET /api/phone-check/:checkId', req.params)
  res.json({
    data: {},
    message: 'Not implemented',
  })
})

app.use(bundler.middleware())

// setup server
app.listen(4000, () => {
  console.log('listening on PORT 4000')
})
