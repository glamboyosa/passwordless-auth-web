const express = require('express')
const Bundler = require('parcel-bundler')

const app = express()
const bundler = new Bundler('./client/index.html', {})

app.use(express.json())
app.use(bundler.middleware())

// create PhoneCheck
app.post('/api/phone-check', async (req, res) => {
 
})

// get PhoneCheck response

app.get('/api/phone-check', async (req, res) => {
 
})

// setup server
app.listen(4000, () => {
  console.log('listening on PORT 4000')
})
