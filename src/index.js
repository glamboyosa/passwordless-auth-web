import 'regenerator-runtime/runtime'

import TruID from './models/index'

import { toggleLoading } from './helpers/loader'

import { form, phoneNumber } from './helpers/variables'

import truIDSDK from '@tru_id/tru-sdk-web'

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Todo: replace with actual localtunnel URL

  const truID = new TruID('https://{subdomain}.local.lt')

  // render loader and create PhoneCheck
  toggleLoading(true)
  try {
    await truID.createPhoneCheck(phoneNumber)

    if (truID.state.data.check_url && truID.state.data.check_id) {
      // store `check_id` in a variable to be used later
      const checkId = truID.state.data.check_id

      toggleLoading(false)

      // Open Check URL

      await truIDSDK.openCheckUrl(checkUrl)

      // Get PhoneCheck Result

      toggleLoading(true)

      await truID.getPhoneCheck(checkId)

      toggleLoading(false)

      if (!truID.state.data.match) {
        // return something
      }
      // we have a match
    }
  } catch (e) {
    if (e.code === truIDSDK.DeviceCoverageErrors.NotMobileIP) {
      // tell the user they should turn off the wifi
      // and use the mobile connection before proceeding
      // return here
    }
    // render something bc it's something else
  }
})
