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
import VueCarousel from 'vue-carousel'
import Vuex from 'vuex'
import axios from 'axios'
import VueAgile from 'vue-agile'
import StarRating from 'vue-star-rating'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import mDatePicker from 'vue-multi-date-picker'
// Vue.install(VueGeolocation)
Vue.config.productionTip = false
const moment = extendMoment(Moment)

Validator.addLocale(messages)
const config = {
  locale: 'nl'
}

// Vue.install(VueGeolocation)
Vue.config.productionTip = false

Vue.use(mDatePicker)
Vue.use(VeeValidate, config)
Vue.use(require('vue-moment'))
Vue.use(VueCarousel)
Vue.use(VeeValidate, config)
Vue.use(vueFilter, geolocation, FullCalendar, axios, moment)
Vue.use(Vuex)
Vue.use(VueAgile)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})
Vue.component('star-rating', StarRating)

/* eslint-disable no-new */

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

export const store = new Vuex.Store({
  state: {
    url: url,
    create_vehicle: {
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
        field_land: [ { value: '' } ],
        field_verhuurdagen: [ { value: '' } ],
        field_min_leeftijd: [ { value: '' } ],
        field_kilometers_per_dag: [ { value: '' } ],
        field_prijs: [ { value: '' } ],
        field_eigenaar: [ { value: '' } ],
        field_afbeelding: [ { value: '' } ],
        field_niet_beschikbaar: [ { value: '' } ],
        field_opties: []
      }
    },
    headers: {}
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App, Sidebar }
})

export default {
  checkCreateOrEdit (route) {
    if ('id' in route.params) {
      Requests.getVehicleId(route.params.id)
      return false
    } else {
      store.state.create_vehicle.data = Requests.vehicle.data
      return true
    }
  }
}
/* url.pathname = 'test/1' */
