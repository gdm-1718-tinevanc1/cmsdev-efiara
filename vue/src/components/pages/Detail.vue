<template>
    <div class="container background--white">
        <div class="vehicle--detail">  
          <div class="message--error">{{message.error}}</div>
          <div class="message--succes">{{message.succes}}</div>

              <img :src="vehicle.field_afbeelding[0].url"> 
              <p class="price--big"><span class="price big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
              <p class="location">{{ vehicle.field_locatie[0].value}}</p> 
              <p class="owner">{{ owner.name[0].value}}</p> 
              <p class="clear"></p>
        
       <div class="tabs">
             <a @click="clickTab('details')" id="detailsButton" class="tabs__button tabs__button--active col s6">Details</a>
             <a @click="clickTab('voorwaarden')" id="voorwaardenButton" class="tabs__button col s6">Voorwaarden</a>
             <a @click="clickTab('review')" id="reviewButton" class="tabs__button col s6">Review</a>
             <a @click="clickTab('kaart')" id="kaartButton" class="tabs__button col s6">Kaart</a>

        </div>

       <div id="details" class="tabview tabview—active">
          <p class="price">€ {{vehicle.field_prijs[0].value}}/dag</p>
          <hr>
            <h4>Technische eigenschappen</h4>
            <table class="tableDetail">
                <tr>
                  <td>Type</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Jaar</td>
                  <td>{{ vehicle.field_inschrijvingsjaar[0].value}}</td>
                </tr>
                <tr>
                  <td>Kilometerteller</td>
                  <td>{{ vehicle.field_kilometerstand[0].value}}</td>
                </tr>
                <tr>
                  <td>Versnelling</td>
                  <td>{{ vehicle.field_versnellingsbak[0].value}}</td>
                </tr>
                <tr>
                  <td>Deuren</td>
                  <td>{{ vehicle.field_deuren[0].value}}</td>
                </tr>
                <tr>
                  <td>Zitplaatsen</td>
                  <td>{{ vehicle.field_zitplaatsen[0].value}}</td>
                </tr>
            </table>
          <hr>
            <h4>Opties en accessoires </h4>
            <ul :for="option in options">
                <li>{{ option.name[0].value}}</li>
            </ul>
      </div>


       <div id="voorwaarden" class="tabview">
       voorwaarden
       </div>

       <div id="review" class="tabview">
       review
       </div>

       <div id="kaart" class="tabview">
        <gmap-map
          :center="center"
          :zoom="13"
          map-type-id="terrain"
          style="width: 100%; height: 280px"
        >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
       </div>
      </div>

      <div class="btn--primary--bottom"><a @click="hire">Dit voertuig huren</a></div>
    </div>
</template>


<script>
import axios from 'axios'
// import { setupCache } from 'axios-cache-adapter'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})
/* const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

const api = axios.create({
  adapter: cache.adapter
}) */
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'detail',
  data: function () {
    return {
      id: this.$route.params.id,
      vehicle: [],
      owner: [],
      options: [],
      location: '',
      message: {
        error: '',
        succes: ''
      },
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {position: {lat: 10.0, lng: 10.0}}
      ],
      headers: {
        'header': {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  created () {
    var self = this
    // get vehicles
    axios.get(`http://cmsdev.localhost/efiara/vehicles/${this.id}?_format=json`, {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => {
        this.vehicle = response
        this.location = response.field_locatie[0].value
        this.getOwner(response.field_eigenaar[0].url)
        for (var i = 0; i < response.field_opties.length; i++) {
          this.getOptions(response.field_opties[i].url, i)
        }
        geocoder.geocode(this.location)

        /* localStorage.setItem('vehicle_' + response.id[0].value, JSON.stringify(response))
        var vehicle = JSON.parse(localStorage.getItem(`vehicle_${response.id[0].value}`))
        console.log(vehicle) */
      })
      .catch(({message: error}) => { this.message.error = error })
    // geocoder
    var geocoder = require('geocoder')
    geocoder.geocode('Roeselare', function (err, data) {
      if (err) {
        console.log(err.stack)
      }
      self.center = data.results[0].geometry.location
      // debugger
      self.markers[0].position.lat = data.results[0].geometry.location.lat
      self.markers[0].position.lng = data.results[0].geometry.location.lng
    })
  },
  methods: {
    clickTab: function (tab) {
      let tabs = document.getElementsByClassName('tabview')
      let buttons = document.getElementsByClassName('tabs__button')
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none'
        buttons[i].className = buttons[i].className.replace(/\btabs__button--active\b/g, '')
      }
      document.getElementById(tab).style.display = 'block'
      let selectedElement = event.target.id
      document.getElementById(selectedElement).className += ' tabs__button--active'
    },
    hire: function () {
      localStorage.setItem('Book_vehicle', this.vehicle.uuid[0].value)
      this.$router.push({name: 'Book'})
    },
    getOwner: function (url) {
      axios.get(`http://cmsdev.localhost/` + url + `?_format=json`, {
        'header': {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(({data: response}) => {
          axios.get(`http://cmsdev.localhost/` + response.field_gebruiker[0].url + `?_format=json`, {
            'header': {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then(({data: response}) => { this.owner = response })
            .catch(({message: error}) => { this.message.error += error })
        })
        .catch(({message: error}) => { this.message.error += error })
    },
    getOptions: function (url, i) {
      axios.get(`http://cmsdev.localhost/` + url + `?_format=json`, {
        'header': {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(({data: response}) => { this.options[i] = response })
        .catch(({message: error}) => { this.message.error = error })
    }
  }
}
</script>


<style lang="scss">
</style>