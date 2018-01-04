<template>
    <div class="container">
      <div class="step4">
        <h4 class="title--page">Beschikbaarheid</h4>
          <form class="form--create">
            <h5>Prijs</h5>
            <label for="prijs">Prijs per dag</label><br>
            <input name="prijs" v-validate="'required|decimal:2|between: 1,200'" id="prijs" placeholder="Prijs per kilometer" v-model="vehicle.data.field_prijs[0].value"
             :class="{'input': true, 'is-danger': errors.has('prijs') }"><br>

            <h5>Kalander</h5>
            <label for="begindatum">Op welke dagen is je voertuig <span class="underline">niet</span> beschikbaar?</label><br>
            <datepicker :inline="true" v-on:selected="getDates" language="nl" :highlighted="state.highlighted" type="date" name="onbeschikbaar" id="onbeschikbaar" placeholder="Onbeschikbare dagen"></datepicker>

            <ul>
                <li v-for="unavailableDay in unavailableDays">{{unavailableDay}}</li>
            </ul>

           <div class="message--succes">{{message.succes}}</div>

          <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>

          <div>
            <div v-if="newVehicle">
              <div class="btn--primary"><a @click="add()">Toevoegen</a></div>
            </div>

            <div v-else="newVehicle">
              <div class="btn--primary"><a @click="edit()"> Aanpassen</a></div>
            </div> 
          </div>
          </form>
      </div>
    </div>
</template>


<script>
import axios from 'axios'
import * as moment from 'moment'
import Main from '../../../main.js'
import Requests from '../../../requests.js'
import Datepicker from 'vuejs-datepicker'
// import * as moment from 'moment'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step4',
  components: {
    Datepicker
  },
  data: function () {
    return {
      message: Requests.message,
      newVehicle: null,
      userId: localStorage.getItem('profileId'),
      vehicle: this.$store.state.create_vehicle,
      state: {
        date: '',
        highlighted: {
          dates: []
        }
      },
      unavailableDays: []
    }
  },
  created () {
    Requests.message.error = ''
    Requests.message.succes = ''
    this.newVehicle = Main.checkCreateOrEdit(this.$route)
    /* axios.post('http://cmsdev.localhost/entity/file?_format=json', {
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
      .catch((error) => { this.message.error = error.response.data.message }) */
  },
  methods: {
    refreshEvents () {
      this.$refs.calendar.$emit('render-event(event)')
    },
    add: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.state.create_vehicle.data.field_prijs[0].value = this.vehicle.data.field_prijs[0].value
          this.$store.state.create_vehicle.data.field_eigenaar[0].target_id = this.userId
          this.$store.state.create_vehicle.data.field_afbeelding[0].target_id = 27
          for (let i = 0; i < this.unavailableDays.length; i++) {
            this.$store.state.create_vehicle.data.field_niet_beschikbaar[i] = { 'value': this.unavailableDays[i] }
          }
          // this.$store.state.create_vehicle.field_opties[0].value = this.vehicle.data.field_prijs[0].value
          // this.$store.state.create_vehicle.field_niet_beschikbaar[0].value = this.vehicle.data.field_prijs[0].value
          console.log(this.$store.state.create_vehicle.data)

          this.$store.state.url.pathname = 'entity/vehicles'
          axios.post(`${this.$store.state.url}?_format=hal_json`, this.$store.state.create_vehicle.data
            /* {
              'name': {
                'value': this.$store.state.create_vehicle.name
              },
              'field_model': {
                'value': this.$store.state.create_vehicle.field_model
              },
              'field_inschrijvingsjaar': {
                'value': this.$store.state.create_vehicle.field_inschrijvingsjaar
              },
              'field_zitplaatsen': {
                'value': this.$store.state.create_vehicle.field_zitplaatsen
              },
              'field_deuren': {
                'value': this.$store.state.create_vehicle.field_deuren
              },
              'field_versnellingsbak': {
                'value': this.$store.state.create_vehicle.field_versnellingsbak
              },
              'field_kilometerstand': {
                'value': this.$store.state.create_vehicle.field_kilometerstand
              },
              'field_straat': {
                'value': this.$store.state.create_vehicle.field_straat
              },
              'field_huisnummer': {
                'value': this.$store.state.create_vehicle.field_huisnummer
              },
              'field_locatie': {
                'value': this.$store.state.create_vehicle.field_locatie
              },
              'field_land': {
                'target_id': this.$store.state.create_vehicle.field_land
              },
              'field_prijs': {
                'value': this.$store.state.create_vehicle.field_prijs
              },
              'field_kilometers_per_dag': {
                'value': this.$store.state.create_vehicle.field_kilometers_per_dag
              },
              'field_min_leeftijd': {
                'value': this.$store.state.create_vehicle.field_min_leeftijd
              },
              'field_verhuurdagen': {
                'value': this.$store.state.create_vehicle.field_verhuurdagen
              },
              'field_eigenaar': {
                'target_id': this.userId
              },
              'field_afbeelding': {
                'target_id': 27
              }
            } */, this.$store.state.headers
          )
            .then(({data: response}) => {
              this.message.succes = 'Jouw voertuig is succesvol toegevoegd'
            })
            .catch((error) => { this.message.error = error.response.data.message })
          /* axios.post('http://cmsdev.localhost/entity/file?_format=json', {
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
            .catch((error) => { this.message.error = error.response.data.message }) */
        }
      })
    },

    edit: function () {
      /* eslint-disable camelcase */
      let field_niet_beschikbaar = []
      for (let i = 0; i < this.unavailableDays.length; i++) {
        field_niet_beschikbaar[i] = { 'value': this.unavailableDays[i] }
      }
      let creds = {
        'field_prijs': {
          'value': this.vehicle.data.field_prijs[0].value
        },
        field_niet_beschikbaar
      }
      console.log(creds)
      // Requests.patchVehicle(this.$route.params.id, creds)
      this.$validator.validateAll().then((result) => {
        if (result) {
          Requests.patchVehicle(this.$route.params.id, creds)
        }
      })
      /* eslint-enable camelcase */
    },
    getDates: function (date) {
      console.log(this.state.highlighted.dates)
      if (this.unavailableDays.includes(moment(date).format('YYYY-MM-DD'))) {
        let index = this.unavailableDays.indexOf(moment(date).format('YYYY-MM-DD'))
        if (index > -1) {
          this.unavailableDays.splice(index, 1)
          // let index2 = this.state.highlighted.dates.indexOf(date)
          this.state.highlighted.dates.splice(index, 1)
        }
      } else {
        this.state.highlighted.dates.push(date)
        this.unavailableDays.push(moment(date).format('YYYY-MM-DD'))
      }
    }
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
