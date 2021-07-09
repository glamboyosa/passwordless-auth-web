const express = require('express')
const Bundler = require('parcel-bundler')

const app = express()
const bundler = new Bundler('./client/index.html', {})

app.use(express.json())

const { createPhoneCheck } = require('./helpers/createPhoneCheck')
const { getPhoneCheck } = require('./helpers/getPhoneCheck')

// create PhoneCheck
app.post('/api/phone-check', async (req, res) => {
  const { phone_number: phoneNumber } = req.body

  try {
    // create PhoneCheck resource
    const { checkId, checkUrl } = await createPhoneCheck(phoneNumber)

    res.status(201).send({
      data: { checkId, checkUrl },
      message: 'PhoneCheck created',
    })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
})

// get PhoneCheck response
app.get('/api/phone-check/:checkId', async (req, res) => {
  // get the `check_id` from the query parameter
  const { checkId } = req.params

  try {
    const { match } = await getPhoneCheck(checkId)
    console.log(match)

    res.status(200).send({ data: { match } })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
})

app.use(bundler.middleware())

// setup server
app.listen(4000, () => {
  console.log('listening on PORT 4000')
})
