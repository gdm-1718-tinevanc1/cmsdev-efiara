import router from './router/index'
import axios from 'axios'
import { store } from '../src/main.js'
import Requests from '../src/requests.js'

let md5 = require('js-md5')

export default{
  user: {
    user: [],
    authenticated: false,
    // errormessage: '',
    lastlogin: '',
    message: {
      succes: '',
      error: ''
    }
  },
  credsLogin: {},
  vehicle: [],

  login (creds, register) {
    store.state.url.pathname = 'user/login'
    axios.post(`${store.state.url}?_format=hal_json`, creds)
      .then(response => {
        this.user.user = response.data
        this.user.authenticated = true
        store.state.error_authenticated = ''
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
        this.getUser()
        if (!register) {
          router.go(-1)
        } else {
          router.push({name: 'ProfileEdit', params: {id: this.user.user.current_user.uid}})
        }
        // router.push({name: 'Home'})
      })
      .catch(({message: error}) => {
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
    store.state.url.pathname = 'user/register'
    this.credsLogin = creds
    axios.post(`${store.state.url}?_format=hal_json`, creds)
      .then(response => {
        // this.message.succes = 'Geregistreerd.'
        let credentials = {'name': this.credsLogin.name.value, 'pass': this.credsLogin.pass.value}
        this.login(credentials, 'register')
      })
      .catch(error => {
        this.user.message.error = error.response.data.message
        // this.user.errormessage = error.response.data.message
      })
  },

  getUser () {
    store.state.url.pathname = `user/${localStorage.getItem('profileId')}`
    axios.get(`${store.state.url}?_format=json`, store.state.headers)
      .then(({data: response}) => {
        this.user.user = response
        this.user.lastlogin = this.user.user.login[0].value
        Requests.getBookings()
        Requests.getRequests()
      })
      .catch(({message: error}) => {
        this.user.message.error = error
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
