<template>
  <div class="container">
     <div class="bookings">
        <p style="display:none">{{vehicle}}</p>
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>
        <div v-if="bookings.length == 0">Je hebt nog geen voertuig geboekt!</div>

        <div v-for="booking in orderedBookings">
           <div class="booking">  
              <p class="booking__price"><span class="bold">Totaal: € {{booking.field_prijs[0].value}}</span></p>
              <i class="fa fa-check request__check" v-bind:class="booking.field_status[0].value" @tap="dropdown($event)" @click="dropdown($event)" aria-hidden="true">
                <select v-if="booking.field_status[0].value == 'Afgekeurd'" 
                @change="changeState(booking)" class="dropdown" v-model="booking.field_status[0].value">
                  <option value="Geannuleerd">Geannuleerd</option>
                  <option value="In afwachting">In afwachting</option>
                  <option disabled="disabled" value="Goedgekeurd">Goedgekeurd</option>
                  <option disabled="disabled" value="Afgekeurd">Afgekeurd</option>
                </select>
              </i>
              <img class="image--booking" :src="booking.vehicle[0].field_afbeelding[0].url"> 
              <router-link :to="{ name: 'Detail' , params: { id: booking.vehicle[0].id[0].value }}"> 
                <p class="title--request">{{booking.vehicle[0].name[0].value}} {{booking.vehicle[0].field_model[0].value}}</p>  
              </router-link>
              <p class="bold request__adress">{{booking.vehicle[0].field_straat[0].value}} {{booking.vehicle[0].field_huisnummer[0].value}} - {{booking.vehicle[0].field_locatie[0].value}}, {{booking.vehicle[0].field_land[0].value}}</p>       
              <p class="request__date">van <span class="bold">{{ booking.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ booking.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ booking.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ booking.field_eind_datum[0].value | date("%R")}}</span> </p>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
/*
import axios from 'axios' */
import * as _ from 'lodash'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'bookings',
  data () {
    return {
      bookings: {
        vehicle: []
      },
      message: {
        error: '',
        succes: ''
      },
      vehicle: [],
      profileId: localStorage.getItem('profileId')
    }
  },
  created () {
    // var self = this
    this.$store.state.url.pathname = `bookings/renter/${this.profileId}`
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        for (var i = 0; i < response.length; i++) {
          var url = response[i].field_voertuig[0].url
          this.getVehicle(url, i)
        }
        this.bookings = response
      })
      .catch(({message: error}) => { this.message.error = error })
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
    getVehicle: function (path, i) {
      let self = this
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => {
          self.bookings[i].vehicle = [response]
          self.vehicle = response
        })
        .catch(({message: error}) => { self.message.error = error })
    },
    changeState: function (booking) {
      this.$store.state.url.pathname = `efiara/bookings/${booking.id[0].value}`
      axios.patch(`${this.$store.state.url}?_format=hal_json`,
        {
          'field_status': {
            'value': booking.field_status[0].value
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
    }
  },
  computed: {
    orderedBookings: function () {
      return _.orderBy(this.bookings, 'name[0].value')
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