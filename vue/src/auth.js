import router from './router/index'
import axios from 'axios'
let md5 = require('js-md5')

export default{
  user: {
    user: [],
    authenticated: false,
    errormessage: '',
    message: {
      succes: '',
      error: ''
    }
  },
  credsLogin: {},
  vehicle: [],

  getVehicleId (id) {
    window.shared.url.pathname = `efiara/vehicles/${id}`
    axios.get(`${window.shared.url}?_format=json`, {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => { this.vehicle = response })
      .catch(({message: error}) => { this.message.error = error })
  },

  login (creds) {
    window.shared.url.pathname = 'user/login'
    axios.post(`${window.shared.url}?_format=hal_json`, creds)
      .then(response => {
        this.user.user = response.data
        this.user.authenticated = true
        localStorage.setItem('profileId', this.user.user.current_user.uid)
        // console.log(this.user.user.current_user.uid)
        let authToken = md5(this.user.user.current_user.name, ':', creds.pass)

        window.shared.headers = {
          auth: {
            username: this.user.user.current_user.name,
            password: creds.pass
          },
          'header': {
            'Accept': 'application/hal+json',
            'Content-Type': 'application/hal+json',
            'X-CSRF-Token': this.user.user.csrf_token,
            'Authorization': `Basic ${authToken}`
          }
        }
        router.push({name: 'Home'})
      })
      .catch(error => { this.user.message.error = error.response.data.message })
  },

  logout () {
    this.user.user = null
    this.user.authenticated = false
    localStorage.removeItem('profileId')
    router.push({name: 'Home'})
  },

  register (creds) {
    window.shared.url.pathname = 'user/register'
    this.credsLogin = creds
    axios.post(`${window.shared.url}?_format=hal_json`, creds)
      .then(response => {
        // this.message.succes = 'Geregistreerd.'
        let credentials = {'name': this.credsLogin.name.value, 'pass': this.credsLogin.pass.value}
        this.login(credentials)
      })
      .catch(error => {
        console.log(error.response.data.message)
        this.user.message.error = error.response.data.message
        this.user.errormessage = error.response.data.message
      })
  },
  checkAuth () {
    let jwt = localStorage.getItem('profileId')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  }
}
