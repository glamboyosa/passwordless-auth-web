import 'regenerator-runtime/runtime'

import Toastify from 'toastify-js'

import 'toastify-js/src/toastify.css'

import {
  messageElement,
  inputElements,
  phoneNumberElement,
  formElement,
} from './helpers/variables'

formElement.addEventListener('submit', async (e) => {
  e.preventDefault()
})
