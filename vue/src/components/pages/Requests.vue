<template>
  <div class="container">
     <div class="requests">
        <p style="display:none">{{vehicle}}</p>
        <h4 class="title--page">Aanvragen</h4>
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>
        <div v-if="requests.length == 0">Men heeft jouw voertuigen nog niet geboekt!</div>

        <div v-for="request in orderedRequests">
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
              <p class="bold request__adress">{{request.vehicle[0].field_straat[0].value}} {{request.vehicle[0].field_huisnummer[0].value}} - {{request.vehicle[0].field_locatie[0].value}}, {{request.vehicle[0].field_land[0].value}}</p>       
              <p class="request__date">van <span class="bold">{{ request.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ request.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.field_eind_datum[0].value | date("%R")}}</span> </p>
              <p class="request__price"><span class="bold">€ {{request.vehicle[0].field_prijs[0].value}}/km</span></p>
             <!-- <p>{{request.field_status[0].value}}</p> -->
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'requests',
  data () {
    return {
      requests: {
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
    this.$store.state.url.pathname = `bookings/owner/${this.profileId}`
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.requests = response
        for (let i = 0; i < response.length; i++) {
          var url = response[i].field_voertuig[0].url
          this.getVehicle(url, i)
        }
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
          self.requests[i].vehicle = [response]
          self.vehicle = response
        })
        .catch(({message: error}) => { self.message.error = error })
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

