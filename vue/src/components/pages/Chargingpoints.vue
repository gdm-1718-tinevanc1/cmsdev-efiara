<template>
  <div class="container">
     <div class="chargingpoints">
     <div class="message--error">{{message.error}}</div>
     <div class="message--succes">{{message.succes}}</div>
     <div v-if="chargingpoints.length == 0">Er zijn geen laadpunten beschikbaar!</div>
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
            @click="center=m.position; getPoint(m, index)"
          ></gmap-marker>
        </gmap-map>
            <div class="point" v-if="activePoint.field_adres">   
                 <table class="tableChargingpoints">
                <tr>
                  <td>Adres</td>
                  <td>{{ activePoint.field_adres[0].value }}</td>
                </tr>
                <tr>
                  <td>Plaats</td>
                  <td>{{ activePoint.name[0].value}}</td>
                </tr>
                <tr>
                  <td>Laadpunten</td>
                  <td>{{ activePoint.field_aantal_laadpunten[0].value}}</td>
                </tr>
                <tr>
                  <td>Eigenaar</td>
                  <td>{{ activePoint.owner[0].name[0].value}}</td>
                </tr>
                <tr>
                  <td>Prijs</td>
                  <td>€ {{ activePoint.field_prijs[0].value}} kWh  </td>
                </tr>
            </table>  
             <div class="message--error">{{message.error}}</div>
             <div class="message--succes">{{message.succes}}</div>
   
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
/* import * as VueGoogleMaps from 'vue2-google-maps'
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
      geocoder: require('geocoder'),
      chargingpoints: {
        owner: []
      },
      message: {
        error: '',
        succes: ''
      },
      searchLocation: 'België',
      center: {lat: 50.51, lng: 4.21},
      markers: [],
      zoom: 7,
      activePoint: {}
    }
  },
  created () {
    // get chargingpoints
    this.$store.state.url.pathname = 'charging_points'
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.chargingpoints = response
        this.getMarkers()
        for (var i = 0; i < response.length; i++) {
          var url = response[i].field_eigenaar[0].url
          this.getOwner(url, i)
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    getMarkers: function () {
      var self = this
      for (let i = 0; i < this.chargingpoints.length; i++) {
        var adres = this.chargingpoints[i].field_adres[0].value + ' ' + this.chargingpoints[i].name[0].value
        self.geocoder.geocode(adres, function (err, data) {
          if (err) {
            console.log(err.stack)
          }
          let id = self.chargingpoints[i].id[0].value
          self.markers.push({ position: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}, id: id })
        })
      }
    },
    getLocation: function () {
      var self = this
      // geocoder
      if (self.searchLocation === '') {
        self.searchLocation = 'België'
      }
      self.geocoder.geocode(self.searchLocation, function (err, data) {
        if (err) {
          console.log(err.stack)
        }
        self.center = data.results[0].geometry.location
        self.zoom = 11
      })
    },
    getPoint: function (marker) {
      console.log(marker.id)
      let self = this
      let activePoint = this.chargingpoints[marker.id - 1]
      Vue.nextTick(function () {
        self.activePoint = activePoint
      })
      // vm.message = 'new message' // change data
      // vm.$el.textContent === 'new message' // false
    },
    getOwner: function (path, i) {
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => { this.chargingpoints[i].owner = [response] })
        .catch(({message: error}) => { this.message.error += error })
    }
  },
  watch: {
    'this.activePoint' (newParams) {
      this.activePoint = newParams
    }
  }
}
</script>

<style lang="scss">
body.background--image{
  margin: 0;
  background-image: url("../../assets/background.png");
  background-color: #000000;
  color: #ffffff
}
</style>