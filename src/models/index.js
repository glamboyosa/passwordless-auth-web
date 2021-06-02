import axios from 'axios'

export default class TruID {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.state = {
      loading: false,
      error: null,
      data: null,
    }
  }

  async createPhoneCheck(phoneNumber) {
    const body = { phone_number: phoneNumber }

    console.log('tru.ID: Creating PhoneCheck for', body)

    this.state = {
      ...this.state,
      loading: true,
    }

    try {
      const response = await axios.post(`${this.baseURL}/phone-check`, body)

      this.state = {
        ...this.state,
        loading: false,
        data: response.data,
      }
    } catch (e) {
      this.state = {
        ...this.state,
        loading: false,
        error: e.message,
      }
    }
  }

  async getPhoneCheck(checkId) {
    this.state = {
      ...this.state,
      loading: true,
      data: null,
      error: null,
    }

    try {
      const response = await axios(
        `${this.baseURL}/phone-check?check_id=${checkId}`,
      )

      this.state = {
        ...this.state,
        data: response.data,
        loading: false,
      }
    } catch (e) {
      this.state = {
        ...this.state,
        error: e.message,
        loading: false,
      }
    }
  }
}
