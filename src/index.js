import 'regenerator-runtime/runtime'

import TruID from './models/index'

import { toggleLoading } from './helpers/loader'

import { form, phoneNumber } from './helpers/variables'

import Toastify from 'toastify-js'

import 'toastify-js/src/toastify.css'

import truIDSDK from '@tru_id/tru-sdk-web'

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Todo: replace with actual localtunnel URL

  const truID = new TruID('https://green-moose-13.loca.lt')

  // render loader and create PhoneCheck
  toggleLoading(true)
  try {
    await truID.createPhoneCheck(phoneNumber.value)

    if (truID.state.data.check_url && truID.state.data.check_id) {
      // store `check_id` and `check_url` in a variable to be used later
      const checkId = truID.state.data.check_id

      const checkUrl = truID.state.data.check_url
      console.log(checkId)

      console.log(truID.state.data)
      // const checkUrl = truID.state.data.check_url

      toggleLoading(false)

      // Open Check URL

      await truIDSDK.openCheckUrl(checkUrl)

      // Get PhoneCheck Result

      toggleLoading(true)

      await truID.getPhoneCheck(checkId)

      toggleLoading(false)

      if (!truID.state.data.match) {
        // we do not have a match
        return Toastify({
          text: 'Cannot verify phone number. Please contact your network provider 🤷‍♂️',
          duration: 3000,
          close: true,
          style: {
            background: '#f00',
          },
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          // backgroundColor: '#f00',
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () {}, // Callback after click
        }).showToast()
      }
      // we have a match
      Toastify({
        text: 'Successfully Signed Up',
        duration: 3000,
        close: true,
        style: {
          background: '#00ff00',
        },
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast()
    }
  } catch (e) {
    toggleLoading(false)
    console.log(e.message)

    if (e.code === truIDSDK.DeviceCoverageErrors.NotMobileIP) {
      // tell the user they should turn off the wifi
      // and use the mobile connection before proceeding
      return Toastify({
        text: 'Please switch to mobile data and try again',
        duration: 3000,
        close: true,
        style: {
          background: '#00b09b',
        },
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        // backgroundColor: '#00b09b',
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast()
    }
    // render something bc it's something else
    Toastify({
      text: `${e.message}`,
      duration: 3000,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      backgroundColor: '#f00',
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {}, // Callback after click
    }).showToast()
  }
})
