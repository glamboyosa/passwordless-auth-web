import axios from 'axios'

export default class TruID {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.state = {
      error: null,
      data: null,
    }
  }

  async createPhoneCheck(phoneNumber) {
    const body = { phone_number: phoneNumber }

    console.log('tru.ID: Creating PhoneCheck for', body)

    try {
      const response = await axios.post(`${this.baseURL}/api/phone-check`, body)

      this.state = {
        ...this.state,
        data: response.data.data,
      }
    } catch (e) {
      console.log(e.response)
      this.state = {
        ...this.state,
        error: e.response.data.message,
      }
    }
  }

  async getPhoneCheck(checkId) {
    this.state = {
      ...this.state,
      data: null,
      error: null,
    }

    console.log('tru.ID: Getting PhoneCheck response')

    try {
      const response = await axios(
        `${this.baseURL}/api//phone-check?check_id=${checkId}`,
      )

      this.state = {
        ...this.state,
        data: response.data.data,
      }
    } catch (e) {
      this.state = {
        ...this.state,
        error: e.response.data.message,
      }
    }
  }
}
