import 'regenerator-runtime/runtime'

import TruID from './models/index'

import { toggleLoading } from './helpers/loader'

import { form } from './helpers/variables'

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Todo: replace with actual localtunnel URL

  const truID = new TruID('https://{subdomain}.local.lt')

  // Todo: get phone number and pass in and make network request
})
