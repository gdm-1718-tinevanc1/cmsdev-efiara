<template>
    <div class="container background--white">
        <div class="vehicle--detail">  
            {{message}}           
              <img :src="vehicle.field_afbeelding[0].url"> 
              <p class="price--big"><span class="price big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
              <p class="location">{{ vehicle.field_locatie[0].value}}</p> 
              <p class="owner">John doe</p> 
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
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'detail',
  data: function () {
    return {
      id: this.$route.params.id,
      vehicle: [],
      location: '',
      message: '',
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {position: {lat: 10.0, lng: 10.0}}
      ]
    }
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
      this.$router.push({name: 'Book'})
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
        geocoder.geocode(this.location)
      })
      .catch(({message: error}) => { this.message = error })
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
  }

}
</script>


<style lang="scss">
</style>