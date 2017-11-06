// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Sidebar from './components/Sidebar.vue'

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

Vue.use(vueFilter, geolocation, FullCalendar)
