const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

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
