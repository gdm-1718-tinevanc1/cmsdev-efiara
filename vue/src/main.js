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
import VeeValidate, {Validator} from 'vee-validate'
import messages from 'vee-validate/dist/locale/nl'

Validator.addLocale(messages)
const config = {
  locale: 'nl'
}
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

Vue.use(VeeValidate, config)
Vue.use(vueFilter, geolocation, FullCalendar)

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
  checkCreateOrEdit (routeparams) {
    if ('id' in routeparams) {
      Requests.getVehicleId(routeparams.id)
      return false
    } else {
      Requests.vehicle.data = window.shared.create_vehicle
      return true
    }
  }
}
/* url.pathname = 'test/1' */
