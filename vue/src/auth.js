import router from './router/index'
import axios from 'axios'
import { store } from '../src/main.js'

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

  login (creds) {
    store.state.url.pathname = 'user/login'
    axios.post(`${store.state.url}?_format=hal_json`, creds)
      .then(response => {
        this.user.user = response.data
        this.user.authenticated = true
        localStorage.setItem('profileId', this.user.user.current_user.uid)
        // console.log(this.user.user.current_user.uid)
        let authToken = md5(this.user.user.current_user.name, ':', creds.pass)

        store.state.headers = {
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
        router.go(-1)
        // router.push({name: 'Home'})
      })
      .catch(({message: error}) => {
        alert('test')
        this.user.message.error = error
      })
  },

  logout () {
    this.user.user = null
    this.user.authenticated = false
    localStorage.removeItem('profileId')
    router.push({name: 'Home'})
  },

  register (creds) {
    this.$store.state.url.pathname = 'user/register'
    this.credsLogin = creds
    axios.post(`${this.$store.url}?_format=hal_json`, creds)
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
