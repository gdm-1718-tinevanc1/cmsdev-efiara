<template>
  <div class="container">
     <div class="requests">
        <h4 class="title--page">Aanvragen</h4>
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>
        <div v-if="!requests.length">Men heeft jouw voertuigen nog niet geboekt!</div>

        <div v-for="request in orderedRequests" v-if="requests.length && checkDate(request)">
           <div class="request">    
              <i class="fa fa-check request__check" v-bind:class="request.field_status[0].value" @tap="dropdown($event)" @click="dropdown($event)" aria-hidden="true">
                <select v-if="request.field_status[0].value !== 'Geannuleerd'" 
                @change="changeState(request)" class="dropdown" v-model="request.field_status[0].value">
                  <option value="In afwachting">In afwachting</option>
                  <option value="Goedgekeurd">Goedgekeurd</option>
                  <option value="Afgekeurd">Afgekeurd</option>
                  <option disabled="disabled" value="Geannuleerd">Geannuleerd</option>
                </select>
              </i>
              <router-link :to="{ name: 'Detail' , params: { id: request.vehicle[0].id[0].value }}"> 
                <p class="title--request">{{request.vehicle[0].name[0].value}} {{request.vehicle[0].field_model[0].value}}</p> 
              </router-link> 
            <router-link v-if="request.field_huurder[0].url" :to="{ name: 'Profile', params: { id: request.field_huurder[0].target_id}}">{{request.renter[0].name[0].value}}</router-link>
            <p class="bold" v-else>Gebruiker is verwijderd</p> 
            <p class="bold request__adress"> {{request.vehicle[0].field_straat[0].value}} {{request.vehicle[0].field_huisnummer[0].value}} - {{request.vehicle[0].field_locatie[0].value}}</p>       
              <p class="request__date">van <span class="bold">{{ request.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ request.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.field_eind_datum[0].value | date("%R")}}</span> </p>
              <p class="request__price"><span class="bold">€ {{request.vehicle[0].field_prijs[0].value}}/km</span></p>
           </div>
        </div>


       <div class="request__header" v-if="requests.length" @click="show = !show">Geschiedenis
         <i v-if="!show" class="fa fa-angle-down" aria-hidden="true"></i>
          <i v-else class="fa fa-angle-up" aria-hidden="true"></i> 
         </div>
        <div v-for="request in orderedRequests" v-if="show && !checkDate(request)">
           <div class="request">    
              <i class="fa fa-check request__check" v-bind:class="request.field_status[0].value" @tap="dropdown($event)" @click="dropdown($event)" aria-hidden="true">
              </i>
              <router-link :to="{ name: 'Detail' , params: { id: request.vehicle[0].id[0].value }}"> 
                <p class="title--request">{{request.vehicle[0].name[0].value}} {{request.vehicle[0].field_model[0].value}}</p> 
              </router-link> 
            <router-link v-if="request.field_huurder[0].url" :to="{ name: 'Profile', params: { id: request.field_huurder[0].target_id}}">{{request.renter[0].name[0].value}}</router-link>
            <p class="bold" v-else>Gebruiker is verwijderd</p> 
            <p class="bold request__adress"> {{request.vehicle[0].field_straat[0].value}} {{request.vehicle[0].field_huisnummer[0].value}} - {{request.vehicle[0].field_locatie[0].value}}</p>       
              <p class="request__date">van <span class="bold">{{ request.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ request.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.field_eind_datum[0].value | date("%R")}}</span> </p>
              <p class="request__price"><span class="bold">€ {{request.vehicle[0].field_prijs[0].value}}/km</span></p>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import axios from 'axios'
import Requests from '../../requests.js'
import * as moment from 'moment'
export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'requests',
  data () {
    return {
      requests: Requests.requests,
      message: {
        error: '',
        succes: ''
      },
      profileId: localStorage.getItem('profileId'),
      show: false
    }
  },
  created () {
    this.$store.state.notification = null
    Requests.getRequests()
  },
  methods: {
    dropdown: function (event) {
      let dropdown = event.target.getElementsByClassName('dropdown')
      for (let i = 0; i < dropdown.length; i++) {
        if (!dropdown[i].classList.contains('open')) {
          dropdown[i].className += ' open'
        } else {
          dropdown[i].className = dropdown[i].className.replace(/\b open\b/g, '')
        }
      }
    },
    changeState: function (request) {
      this.$store.state.url.pathname = `efiara/bookings/${request.id[0].value}`
      axios.patch(`${this.$store.state.url}?_format=hal_json`,
        {
          'field_status': {
            'value': request.field_status[0].value
          }
        }, this.$store.state.headers
      )
        .then(response => {
          console.log('Status is aangepast')
          let dropdown = document.getElementsByClassName('dropdown')
          for (let i = 0; i < dropdown.length; i++) {
            dropdown[i].className = dropdown[i].className.replace(/\b open\b/g, '')
          }
        })
        .catch(error => {
          this.message.error = error.response.data.message
        })
    },
    checkDate: function (booking) {
      let bookingDate = moment(booking.name[0].value)
      let today = moment(new Date())
      if (bookingDate - today > 0) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    orderedRequests: function () {
      return _.orderBy(this.requests, 'name[0].value')
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

