<template>
    <div class="container background--white">
        <div class="vehicle--detail">  
          <div class="message--error">{{message.error}}</div>
          <div class="message--succes">{{message.succes}}</div>

              <agile>     
                  <div class="slide" v-if="vehicle.field_afbeelding.length"  v-for="image in vehicle.field_afbeelding">
                      <img class="detail__image" :src="image.url"> 
                  </div>
              </agile>
              <p class="price--big--detail"><span class="price big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
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
              <ul v-for="option in options">
                <li>{{ option.name[0].value}}</li>
            </ul>
      </div>


       <div id="voorwaarden" class="tabview">
       <table class="tableDetail">
                <tr>
                  <td>Maximale verhuurdagen</td>
                  <td>{{ vehicle.field_verhuurdagen[0].value}} dagen</td>
                </tr>
                <tr>
                  <td>Maximale kilometers per dag</td>
                  <td>{{ vehicle.field_kilometers_per_dag[0].value}} km/dag</td>
                </tr>
                <tr>
                  <td>Minimum leeftijd</td>
                  <td>{{ vehicle.field_min_leeftijd[0].value}} jaar</td>
                </tr>
            </table>
       </div>

       <div id="review" class="tabview">
       review
       </div>

       <div id="kaart" class="tabview">
        <gmap-map
          :center="center"
          :zoom="7"
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
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
       </div>
      </div>

      <div v-if="checkAuthVehicle">
        <div class="btn--primary--bottom">
            <router-link :to="{ name: 'Menu', params: { id: this.id}}">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </router-link>

        </div>
      </div>
      <div v-else="checkAuthVehicle">
        <div class="btn--primary--bottom"><a @click="hire">Dit voertuig huren</a></div>
      </div>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import VueAgile from 'vue-agile'
// import { setupCache } from 'axios-cache-adapter'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueAgile)

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
  components: {},
  data: function () {
    return {
      geocoder: require('geocoder'),
      id: this.$route.params.id,
      vehicle: [],
      owner: [],
      options: [],
      address: '',
      message: {
        error: '',
        succes: ''
      },
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {position: {lat: 10.0, lng: 10.0}}
      ]
    }
  },
  created () {
    var self = this
    window.shared.url.pathname = `efiara/vehicles/${this.id}`
    // get vehicles
    axios.get(`${window.shared.url}?_format=json`)
      .then(({data: response}) => {
        this.vehicle = response
        let address = response.field_locatie[0].value
        for (var i = 0; i < response.field_opties.length; i++) {
          this.getOptions(response.field_opties[i].url, i)
        }
        this.getOwner(response.field_eigenaar[0].url)
        this.geocoder.geocode(address, function (err, data) {
          if (err) {
            console.log(err.stack)
          }
          self.center = data.results[0].geometry.location
          self.markers[0].position.lat = data.results[0].geometry.location.lat
          self.markers[0].position.lng = data.results[0].geometry.location.lng
        })
      })
      .catch(({message: error}) => { this.message.error = error })
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
      localStorage.setItem('Book_vehicleId', this.vehicle.id[0].value)
      this.$router.push({name: 'Book'})
    },
    getOwner: function (path) {
      window.shared.url.pathname = path
      axios.get(`${window.shared.url}?_format=json`)
        .then(({data: response}) => { this.owner = response })
        .catch(({message: error}) => { this.message.error += error })
    },
    getOptions: function (path, i) {
      window.shared.url.pathname = path
      axios.get(`${window.shared.url}?_format=json`)
        .then(({data: response}) => {
          this.options[i] = response
        })
        .catch(({message: error}) => { this.message.error += error })
    }
  },
  computed: {
    checkAuthVehicle: function () {
      let vehicleOwner = this.vehicle.field_eigenaar[0].target_id.toString()
      let userId = localStorage.getItem('profileId')
      if (vehicleOwner === userId) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>


<style lang="scss">

</style>