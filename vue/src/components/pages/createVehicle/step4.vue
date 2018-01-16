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
          for (let i = 0; i < this.unavailableDays.length; i++) {
            this.$store.state.create_vehicle.data.field_niet_beschikbaar[i] = { 'value': this.unavailableDays[i] }
          }

          let field_niet_beschikbaar = this.$store.state.create_vehicle.data.field_niet_beschikbaar
          let field_afbeelding_data = this.$store.state.create_vehicle.data.field_afbeelding_data
          let field_opties = this.$store.state.create_vehicle.data.field_opties
          this.$store.state.url.pathname = 'entity/vehicles'
          axios.post(`${this.$store.state.url}?_format=json`, this.$store.state.create_vehicle.data, this.$store.state.headers
          )
            .then(({data: response}) => {
              this.message.succes = 'Jouw voertuig is succesvol toegevoegd'
            })
            .catch(({error}) => { this.message.error = error })
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          Requests.patchVehicle(this.$route.params.id, creds)
        }
      })
      /* eslint-enable camelcase */
    },
    getDates: function (date) {
      if (this.unavailableDays.includes(moment(date).format('YYYY-MM-DD'))) {
        let index = this.unavailableDays.indexOf(moment(date).format('YYYY-MM-DD'))
        if (index > -1) {
          this.unavailableDays.splice(index, 1)
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
body.background--image{
  margin: 0;
  background-image: url("../../../assets/background.png");
  background-color: #000000;
  color: #ffffff
}
</style>
