import axios from 'axios'
import Auth from '../src/auth.js'
import { store } from '../src/main.js'

export default {

  message: {
    succes: '',
    error: ''
  },
  vehicle: {
    data: {
      name: [ { value: '' } ],
      field_model: [ { value: '' } ],
      field_inschrijvingsjaar: [ { value: '' } ],
      field_zitplaatsen: [ { value: '' } ],
      field_deuren: [ { value: '' } ],
      field_versnellingsbak: [ { value: '' } ],
      field_kilometerstand: [ { value: '' } ],
      field_straat: [ { value: '' } ],
      field_huisnummer: [ { value: '' } ],
      field_locatie: [ { value: '' } ],
      field_land: [ { target_id: '' } ],
      field_verhuurdagen: [ { value: '' } ],
      field_min_leeftijd: [ { value: '' } ],
      field_kilometers_per_dag: [ { value: '' } ],
      field_prijs: [ { value: '' } ],
      field_eigenaar: [ { target_id: '' } ],
      field_niet_beschikbaar: [ { value: '' } ],
      field_opties: [],
      field_afbeelding_data: []
    }
  },
  countries: {},
  bookings: {
    vehicle: []
  },
  requests: {
    vehicle: [],
    renter: []
  },
  // get vehicle edit 4x
  getVehicleId (id) {
    store.state.url.pathname = `efiara/vehicles/${id}`
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => { store.state.create_vehicle.data = response })
      .catch(({message: error}) => { this.message.error = error.response.data })
  },

  // get vehicle edit 4x
  patchVehicle (id, creds) {
    store.state.url.pathname = `efiara/vehicles/${id}`
    axios.patch(`${store.state.url}?_format=hal_json`, creds, store.state.headers)
      .then(response => {
        this.message.succes = 'Je voertuig is aangepast'
        this.message.error = ''
      })
      .catch(error => {
        this.message.error = error.response.data
      })
  },

  getCountries () {
    store.state.url.pathname = `taxonomie/landen`
    axios.get(`${store.state.url}?_format=hal_json`)
      .then(({data: response}) => { this.countries = response })
      .catch(({message: error}) => { this.message.error = error })
  },

  getBookings () {
    store.state.url.pathname = `bookings/renter/${localStorage.getItem('profileId')}`
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.bookings = response
        for (var i = 0; i < response.length; i++) {
          if (response[i].field_voertuig[0].url) {
            var url = response[i].field_voertuig[0].url
            this.getVehicle(url, i, this.bookings)
          }
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },

  getRequests () {
    store.state.url.pathname = `bookings/owner/${localStorage.getItem('profileId')}`
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.requests = response
        this.checkNotifications(response)
        for (let i = 0; i < response.length; i++) {
          var url = response[i].field_voertuig[0].url
          this.getVehicle(url, i, this.requests)
          if (response[i].field_huurder[0].url) {
            var urlRenter = response[i].field_huurder[0].url
            this.getUser(urlRenter, i, this.requests)
          }
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },

  getVehicle: function (path, i, object) {
    let self = this
    store.state.url.pathname = path
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => {
        object[i].vehicle = [response]
      })
      .catch(({message: error}) => { self.message.error = error })
  },

  checkNotifications: function (requests) {
    let newrequests = []
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].created[0].value > Auth.user.lastlogin) {
        newrequests.push(requests[i].created[0].value)
      }
    }
    store.state.notification = newrequests.length
  },

  getUser: function (path, i, object) {
    let self = this
    store.state.url.pathname = path
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => {
        object[i].renter = [response]
      })
      .catch(({message: error}) => { self.message.error = error })
  }
}
