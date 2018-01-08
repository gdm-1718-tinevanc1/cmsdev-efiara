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

              <router-link :to="{ name: 'Profile', params: { id: owner.uid[0].value}}"> <p class="owner">{{ owner.name[0].value}}</p> </router-link>
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
        <div class="review--total">Totaal: <star-rating class="right" :rating="reviewTotal" :star-size="20" :read-only="true" :show-rating="false"></star-rating></div>
        <hr>
        <div class="review--title">Reviews: </div>
        <div class="review" v-for="review in reviews">
          <star-rating class="right" :rating="review.field_score[0].value" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
          <div class="bold">{{review.name[0].value}}</div>
          {{review.field_commentaar[0].value}}
        </div>
        <form v-if="!checkAuthVehicle" class="form--review" on:submit.prevent="submitReview" data-vv-scope="review">
          <hr>
          <p>Geef jouw mening:</p>
          <star-rating name="rating" @rating-selected="validateRating" v-model="reviewCredentials.score" :star-size="20" :show-rating="false"></star-rating>
          <label for="titel">Titel</label><br>
          <input name="titel" id="titel" placeholder="titel" v-validate="'required'" v-model="reviewCredentials.title"><br>

          <label for="commentaar">Commentaar</label><br>
          <textarea name="commentaar" id="commentaar" placeholder="commentaar"  rows="4" cols="50" v-validate="'required'" v-model="reviewCredentials.comment"></textarea>


          <div class="message--error">
            <span>
              {{message.validate_error}}
            </span>
            <ul v-for="error in errors.all()">
                <li>{{error}}</li>
              </ul>
          </div>
          <div class="btn--primary"><a v-validate="'required'" @click="submitReview">Mening delen</a></div>
        </form>
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
import Auth from '../../auth.js'
import axios from 'axios'
import StarRating from 'vue-star-rating'

/*
import Vue from 'vue'
import axios from 'axios'
import Auth from '../../auth.js'
import VueAgile from 'vue-agile'
import * as VueGoogleMaps from 'vue2-google-maps'
import StarRating from 'vue-star-rating'

Vue.use(VueAgile)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeyj-ODZCNmRRJbjgmIQKOKgE4Bin0zBg',
    libraries: 'places'
  }
})
Vue.component('star-rating', StarRating)
*/
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'detail',
  components: {
    StarRating
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
        succes: '',
        validate_error: ''
      },
      rating: null,
      reviewTotal: null,
      reviewCredentials: {
        title: '',
        comment: '',
        score: null
      },
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {position: {lat: 10.0, lng: 10.0}}
      ]
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
    },
    submitReview: function () {
      if (Auth.user.authenticated) {
        // this.$validator.validateAll('review')
        this.$validator.validateAll('review').then((result) => {
          if (this.reviewCredentials.score) {
            this.$store.state.url.pathname = '/entity/review'
            axios.post(`${this.$store.state.url}?_format=hal_json`,
              {
                'name': {
                  'value': this.reviewCredentials.title
                },
                'field_commentaar': {
                  'value': this.reviewCredentials.comment
                },
                'field_score': {
                  'value': this.reviewCredentials.score
                },
                'field_voertuig': {
                  'target_id': this.id
                }
              }, this.$store.state.headers
            )
              .then(({data: response}) => {
                this.getReviews()
              })
              .catch(({message: error}) => { this.message.error = error })
          } else {
            this.message.validate_error = 'score is verplicht'
          }
        })
      } else {
        this.$router.push({name: 'Login'})
      }
    },
    validateRating: function () {
      this.message.validate_error = ''
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