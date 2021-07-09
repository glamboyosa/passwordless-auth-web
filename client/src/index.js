import 'regenerator-runtime/runtime'

import {
  messageElement,
  inputElements,
  phoneNumberElement,
  formElement,
} from './helpers/variables'
import { toggleLoading } from './helpers/loader'

import TruSDK from '@tru_id/tru-sdk-web'

const ErrorMessages = {
  400: 'We cannot presently register you because we do not have coverage for your mobile network operator.',
  412: `To enable signup, please disable your WiFi so that your phone number can be verified using your cellular data connection.
        Once disabled, please <span class="link" onclick="window.location.reload()">reload the page</a> in the browser.`,
  500: 'An unknown error occurred.',
}

window.addEventListener('load', async () => {
  // check if user is making request via a mobile network
  const deviceCoverageResponse = await fetch(
    'https://eu.api.tru.id/public/coverage/v0.1/device_ip',
  )

  console.log(deviceCoverageResponse)

  if (deviceCoverageResponse.status === 200) {
    for (let input of inputElements) {
      input.removeAttribute('disabled')
    }
  } else if (deviceCoverageResponse.status >= 400) {
    messageElement.innerHTML = ErrorMessages[deviceCoverageResponse.status]
    messageElement.style.display = 'block'
  } else {
    messageElement.innerHTML = ErrorMessages[500]
    messageElement.style.display = 'block'
  }
})

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

formElement.addEventListener('submit', async (e) => {
  e.preventDefault()

  const phoneNumber = phoneNumberElement.value.replace(/\s+/g, '')

  toggleLoading(true)

  const phoneCheck = await createPhoneCheck(phoneNumber)
  console.log('PhoneCheck creation result', phoneCheck)

  await TruSDK.openCheckUrl(phoneCheck.data.checkUrl)

  const phoneCheckResult = await getPhoneCheck(phoneCheck.data.checkId)
  console.log('PhoneCheck result', phoneCheckResult)

  if (phoneCheckResult.data.match === true) {
    toggleLoading(false)

    Toastify({
      text: 'Successfully Signed Up',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      backgroundColor: '#00ff00',
      style: {
        color: '#000',
      },
      stopOnFocus: true,
    }).showToast()
  } else {
    // we have a match
    toggleLoading(false)

    Toastify({
      text: 'Unable to verify phone number.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      backgroundColor: '#f00',
      style: {
        color: '#000',
      },
      stopOnFocus: true,
    }).showToast()
  }
})

async function createPhoneCheck(phoneNumber) {
  const body = { phone_number: phoneNumber }

  console.log('tru.ID: Creating PhoneCheck for', body)

  const response = await fetch('/api/phone-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

async function getPhoneCheck(checkId) {
  console.log('tru.ID: Getting PhoneCheck Result passing in: ', checkId)

  const response = await fetch(`/api/phone-check/${checkId}`)

  return response.json()
}
