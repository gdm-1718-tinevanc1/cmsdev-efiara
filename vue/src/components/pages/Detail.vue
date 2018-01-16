<template>
    <div class="container background--white">
        <div class="vehicle--detail">  
          <div class="message--error">{{message.error}}</div>
          <div class="message--succes">{{message.succes}}</div>
            <agile>     
                <div class="slide" v-if="vehicle.field_afbeelding_data.length"  v-for="image in vehicle.field_afbeelding_data">
                    <img class="detail__image" :src="image.value"> 
                </div>
            </agile>
              
            <p class="price--big--detail"><span class="price big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
            <p class="location">{{ vehicle.field_locatie[0].value}}</p> 
            
            <router-link :to="{ name: 'Profile', params: { id: owner.uid[0].value}}"> <p class="owner">{{ owner.name[0].value}}</p> </router-link>
            <p class="clear"></p>
        
       <div class="tabs">
          <a @click="clickTab('details')" id="detailsButton" class="tabs__button tabs__button--active col s6">Details</a>
          <a @click="clickTab('conditions')" id="voorwaardenButton" class="tabs__button col s6">Voorwaarden</a>
          <a @click="clickTab('review')" id="reviewButton" class="tabs__button col s6">Review</a>
          <a @click="clickTab('map')" id="kaartButton" class="tabs__button col s6">Kaart</a>
        </div>

        <DetailsTab :vehicle="vehicle" :options="options"></DetailsTab>
        <ConditionsTab :vehicle="vehicle"></ConditionsTab>
        <ReviewTab :reviews="reviews" :reviewTotal="reviewTotal" :checkAuth="checkAuth"></ReviewTab>
        <MapTab :markers="markers" :center="center" v-bind:getReviews="getReviews()"></MapTab>
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
import StarRating from 'vue-star-rating'
import Auth from '../../auth.js'
import axios from 'axios'
import DetailsTab from '../detail_tabs/detailsTab'
import ConditionsTab from '../detail_tabs/conditionsTab'
import MapTab from '../detail_tabs/mapTab'
import ReviewTab from '../detail_tabs/reviewTab'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'detail',
  components: {
    StarRating,
    DetailsTab,
    ConditionsTab,
    MapTab,
    ReviewTab
  },
  data: function () {
    return {
      geocoder: require('geocoder'),
      id: this.$route.params.id,
      vehicle: [],
      reviews: [],
      owner: [],
      options: [],
      address: '',
      message: {
        error: '',
        succes: ''
      },
      rating: null,
      reviewTotal: null,
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {position: {lat: 10.0, lng: 10.0}}
      ],
      checkAuth: false
    }
  },
  created () {
    var self = this
    this.$store.state.url.pathname = `efiara/vehicles/${this.id}`
    // get vehicles
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.vehicle = response
        let address = response.field_locatie[0].value
        for (var i = 0; i < response.field_opties.length; i++) {
          this.getOptions(response.field_opties[i].url, i)
        }
        this.getOwner(response.field_eigenaar[0].url)
        this.getReviews()
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
      if (Auth.user.authenticated) {
        localStorage.setItem('Book_vehicleId', this.vehicle.id[0].value)
        this.$router.push({name: 'Book'})
      } else {
        this.$store.state.error_authenticated = 'Je moet aangemeld zijn om een voertuig te boeken. Meld je aan.'
        this.$router.push({name: 'Login'})
      }
    },
    getOwner: function (path) {
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => { this.owner = response })
        .catch(({message: error}) => { this.message.error += error })
    },
    getReviews: function () {
      this.$store.state.url.pathname = `reviews/vehicle/${this.id}`
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => {
          this.reviews = response
          let total = []
          for (let i = 0; i < response.length; i++) {
            total.push(response[i].field_score[0].value)
          }
          this.reviewTotal = total.reduce((a, b) => a + b, 0) / response.length
        })
        .catch(({message: error}) => { this.message.error += error })
    },
    getOptions: function (path, i) {
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
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
        this.checkAuth = true
        return true
      } else {
        this.checkAuth = false
        return false
      }
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