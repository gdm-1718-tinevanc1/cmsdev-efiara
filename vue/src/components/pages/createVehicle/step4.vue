<template>
    <div class="container">
      <div class="step4">
        <h4 class="title--page">Beschikbaarheid</h4>
          <form class="form--create">
            <h5>Prijs</h5>
            <label for="prijs">Prijs per kilometer</label><br>
            <input name="prijs" v-validate="'required|numeric|1-20'" id="prijs" placeholder="Prijs per kilometer" v-model="vehicle.data.field_prijs[0].value"><br>

            <h5>Kalander</h5>
            <full-calendar :events="events"></full-calendar>

           <div class="message--error">{{message.error}}</div>
           <div class="message--succes">{{message.succes}}</div>

          <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>

          <div v-if="this.$validator.validateAll()">
            <div v-if="newVehicle">
              <div class="btn--primary"><a @click="submit()">Toevoegen</a></div>
            </div>

            <div v-else="newVehicle">
              <div class="btn--primary"><a @click="save()"> Aanpassen</a></div>
            </div> 
          </div>
          </form>
      </div>
    </div>
</template>


<script>
import axios from 'axios'
import Main from '../../../main.js'
import Requests from '../../../requests.js'

import Vue from 'vue'
import FullCalendar from 'vue-full-calendar'
window.jQuery = window.$ = require('jquery')

Vue.use(FullCalendar)

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step4',
  data: function () {
    return {
      newVehicle: null,
      userId: localStorage.getItem('profileId'),
      message: {
        error: '',
        succes: ''
      },
      vehicle: Requests.vehicle,
      events: [
        {
          title: 'event1',
          start: '2017-11-01',
          allDay: true,
          color: 'yellow',
          textColor: 'red'
        },
        {
          title: 'event2',
          start: '2017-11-05',
          end: '2017-11-10'
        },
        {
          title: 'event3',
          start: '2017-11-12',
          allDay: false
        }
      ]
    }
  },
  created () {
    this.newVehicle = Main.checkCreateOrEdit(this.$route.params)

    axios.post('http://cmsdev.localhost/entity/file?_format=json', {
      '_links':
        {
          'type': {'href': 'http://cmsdev.localhost/rest/type/file/file'}
        },
      'filename': [{'value': 'input.jpg'}],
      'filemime': [{'value': 'image/jpeg'}],
      'data': [{'value': 'insert-output-from-base64-here'}]
    })
      .then(({data: response}) => {
        this.message.succes = 'Jouw voertuig is succesvol toegevoegd'
      })
      .catch((error) => { this.message.error = error.response.data.message })
  },
  methods: {
    refreshEvents () {
      this.$refs.calendar.$emit('render-event(event)')
    },
    submit: function () {
      axios.post('http://cmsdev.localhost/entity/file?_format=json', {
        '_links':
          {
            'type': {'href': 'http://cmsdev.localhost/rest/type/file/file'}
          },
        'filename': [{'value': 'input.jpg'}],
        'filemime': [{'value': 'image/jpeg'}],
        'data': [{'value': 'insert-output-from-base64-here'}]
      })
        .then(({data: response}) => {
          this.message.succes = 'Jouw voertuig is succesvol toegevoegd'
        })
        .catch((error) => { this.message.error = error.response.data.message })
    }
    /*
      window.shared.create_vehicle.price = this.vehicle.data.field_prijs[0].value
      window.shared.url.pathname = 'entity/vehicles'
      axios.post(`${window.shared.url}?_format=hal_json`,
        {
          'name': {
            'value': window.shared.create_vehicle.brand
          },
          'field_deuren': {
            'value': window.shared.create_vehicle.doors
          },
          'field_inschrijvingsjaar': {
            'value': window.shared.create_vehicle.vehicle_year
          },
          'field_kilometerstand': {
            'value': window.shared.create_vehicle.kilometers
          },
          'field_locatie': {
            'value': window.shared.create_vehicle.place
          },
          'field_model': {
            'value': window.shared.create_vehicle.model
          },
          'field_prijs': {
            'value': window.shared.create_vehicle.price
          },
          'field_versnellingsbak': {
            'value': window.shared.create_vehicle.gearbox
          },
          'field_zitplaatsen': {
            'value': window.shared.create_vehicle.seating
          },
          'field_kilometers_per_dag': {
            'value': window.shared.create_vehicle.max_kilometers
          },
          'field_min_leeftijd': {
            'value': window.shared.create_vehicle.min_age
          },
          'field_verhuurdagen': {
            'value': window.shared.create_vehicle.max_days
          },
          'field_eigenaar': {
            'target_id': this.userId
          },
          'field_afbeelding': {
            'target_id': 27
          }
        }, window.shared.headers
      )
        .then(({data: response}) => {
          this.message.succes = 'Jouw voertuig is succesvol toegevoegd'
        })
        .catch((error) => { this.message.error = error.response.data.message })
    } */
  },
  watch: {
    '$route.params' (newParams) {
      this.newVehicle = Main.checkCreateOrEdit(newParams)
    }
  }
}
</script>

<style lang="scss">

</style>
