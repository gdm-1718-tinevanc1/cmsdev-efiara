// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Sidebar from './components/Sidebar.vue'
import Requests from './requests'
// import axios from 'axios'

import 'font-awesome/css/font-awesome.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import geolocation from 'weex-vue-geolocation'
import vueFilter from 'vue-filter'
import FullCalendar from 'vue-full-calendar'

// Vue.install(VueGeolocation)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Sidebar }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})

const url = new URL('http://cmsdev.localhost/')
const params = new URLSearchParams()
params.append('_format', 'hal_json')
url.params = params

window.shared = {
  url: url,
  create_vehicle: {
    name: [ { value: '' } ],
    field_model: [ { value: '' } ],
    vehicle_country: [ { value: '' } ],
    field_inschrijvingsjaar: [ { value: '' } ],
    field_zitplaatsen: [ { value: '' } ],
    field_deuren: [ { value: '' } ],
    field_versnellingsbak: [ { value: '' } ],
    field_kilometerstand: [ { value: '' } ],
    consumption: [ { value: '' } ],
    street: [ { value: '' } ],
    number: [ { value: '' } ],
    field_locatie: [ { value: '' } ],
    country: [ { value: '' } ],
    field_verhuurdagen: [ { value: '' } ],
    field_min_leeftijd: [ { value: '' } ],
    field_kilometers_per_dag: [ { value: '' } ],
    field_prijs: [ { value: '' } ]
  },
  headers: {}
}

export default {
  /* vehicle: {
    name: '',
    field_model: '',
    vehicle_country: '',
    field_inschrijvingsjaar: '',
    field_zitplaatsen: '',
    field_deuren: '',
    field_versnellingsbak: '',
    field_kilometerstand: '',
    consumption: '',
    street: '',
    number: '',
    field_locatie: '',
    country: '',
    field_verhuurdagen: '',
    field_min_leeftijd: '',
    field_kilometers_per_dag: '',
    field_prijs: ''
  }, */
  // newVehicle: null,
  checkCreateOrEdit (routeparams) {
    if ('id' in routeparams) {
      /* let id = routeparams.id
      window.shared.url.pathname = `efiara/vehicles/${id}`
      axios.get(`${window.shared.url}?_format=json`, {
        'header': {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(({data: response}) => {
          this.vehicle = response
          console.log(this.vehicle)
          return false
        })
        .catch(({message: error}) => { this.message.error = error }) */
      Requests.getVehicleId(routeparams.id)
      return false
    } else {
      Requests.vehicle.data = window.shared.create_vehicle
      return true
    }
  }
}
/* url.pathname = 'test/1' */

Vue.use(vueFilter, geolocation, FullCalendar)
