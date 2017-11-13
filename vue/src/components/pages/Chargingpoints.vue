<template>
  <div class="container">
     <div class="chargingpoints">
     <label id="label--search">
        <input class="input--location" name="location" id="location" 
        placeholder="Plaats" @keyup.enter="getLocation" v-model="searchLocation"><br>
    </label>

    <gmap-map
          :center="center"
          :zoom=zoom
          map-type-id="terrain"
          style="width: 100%; height: 280px"
        >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
			      :optimized="false",
            :draggable="false"
            @click="center=m.position; getPoint($event)"
          ></gmap-marker>
        </gmap-map>

        <div :for="point in filterLocation">
            <div class="point">   
                 <table class="tableChargingpoints">
                <tr>
                  <td>Adres</td>
                  <td>{{ point.field_adres[0].value }}</td>
                </tr>
                <tr>
                  <td>Plaats</td>
                  <td>{{ point.name[0].value}}</td>
                </tr>
                <tr>
                  <td>Laadpunten</td>
                  <td>{{ point.field_aantal_laadpunten[0].value}}</td>
                </tr>
                <tr>
                  <td>Eingenaar</td>
                  <td>{{ point.field_eigenaar_laadpunten[0].target_id.value}}</td>
                </tr>
                <tr>
                  <td>Prijs</td>
                  <td>€ {{ point.field_prijs[0].value}} kWh  </td>
                </tr>
            </table>  
            <!-- filterBy searchLocation in 'name' -->       
             </div>
        </div>
          <div class="message">{{message.error}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
/*
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})
*/
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'chargingpoints',
  data () {
    return {
      chargingpoints: [],
      message: {
        error: '',
        succes: ''
      },
      searchLocation: 'België',
      center: {lat: 50.51, lng: 4.21},
      markers: [],
      zoom: 7,
      activePoint: ''
    }
  },
  created () {
    // get chargingpoints
    axios.get('http://cmsdev.localhost/charging_points?_format=json', {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => {
        this.chargingpoints = response
        this.getMarkers()
        console.log(this.chargingpoints.length)
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    getMarkers: function () {
      var self = this
      for (var i = 0; i < this.chargingpoints.length; i++) {
        var geocoder = require('geocoder')
        var adres = this.chargingpoints[i].field_adres[0].value + ' ' + this.chargingpoints[i].name[0].value
        var id = this.chargingpoints[i].id[0].value
        geocoder.geocode(adres, function (err, data) {
          if (err) {
            console.log(err.stack)
          }
          self.markers.push({position: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}}, {title: id})
        })
      }
    },
    getLocation: function () {
      var self = this
      // geocoder
      if (self.searchLocation === '') {
        self.searchLocation = 'België'
      }
      var geocoder = require('geocoder')
      geocoder.geocode(self.searchLocation, function (err, data) {
        if (err) {
          console.log(err.stack)
        }
        self.center = data.results[0].geometry.location
        self.zoom = 11
      })
    },
    getPoint: function (event) {
      this.activePoint = 'stalhof 2'
      console.log(event)
    }
  },
  computed: {
    filterLocation: function () {
      var self = this
      return this.chargingpoints.filter(function (point) {
        return point.field_adres[0].value === self.activePoint
      })
    }
  }
}
</script>

<style lang="scss">


</style>