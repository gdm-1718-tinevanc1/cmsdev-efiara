<template>
  <div class="container">
     <div class="book">
        <form class="form--book">
          <p class="bookVehicle">Voertuig</p>
          <label for="begindatum">Begin datum</label><br>
          <datepicker v-validate="'required'" v-model="data_book.startdate" :disabled="state.disabled_startdate" v-on:closed="enddateDisabled" language="nl" type="date" name="begindatum" id="begindate" placeholder="Begin datum" :class="{'input': true, 'is-danger': errors.has('begindatum') }"></datepicker>

          <label for="begintijd">Start uur</label><br>          
          <input v-validate="'required'" type="time" name="begintijd" id="begintime" v-model="data_book.starttime" :class="{'input': true, 'is-danger': errors.has('begintijd') }">

          <label for="einddatum">Eind datum</label><br>
          <datepicker v-validate="'required'"v-model="data_book.enddate" :disabled="state.disabled_enddate" type="date" name="enddate" id="einddatum" placeholder="Eind datum" :open-date="data_book.startdate" :class="{'input': true, 'is-danger': errors.has('einddatum') }"></datepicker>

          <label for="eindtijd">Eind uur</label><br>          
          <input v-validate="'required'" type="time" name="eindtijd" id="endtime" v-model="data_book.endtime" :class="{'input': true, 'is-danger': errors.has('eindtijd') }">

           <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>

           <div class="btn--primary"><a @click="submit()">Huur dit voertuig nu!</a></div>
        </form>
    </div>
  </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker'
import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'
import axios from 'axios'
import * as moment from 'moment'
Vue.use(require('vue-moment'))

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'book',
  components: {
    Datepicker,
    HotelDatePicker
  },
  data () {
    return {
      vehicleId: localStorage.getItem('Book_vehicleId'),
      userId: localStorage.getItem('profileId'),
      vehicle: [],
      message: {
        error: '',
        succes: ''
      },
      data_book: {
        startdate: '',
        starttime: '',
        enddate: '',
        endtime: '',
        status: '',
        renter: '',
        vehicle: ''
      },
      state: {
        date: {},
        disabled_startdate: {
          dates: [],
          ranges: []
        },
        disabled_enddate: {
          to: null,
          from: null
        }
      }
    }
  },
  created () {
    console.log(this.$children)
    window.shared.url.pathname = `efiara/vehicles/${this.vehicleId}`
    axios.get(`${window.shared.url}?_format=hal_json`)
      .then(({data: response}) => {
        for (let i = 0; i < response.field_beschikbaar.length; i++) {
          this.state.disabled_startdate.dates[i] = new Date(response.field_beschikbaar[i].value)
        }
        this.vehicle = response
      })
      .catch(({message: error}) => { this.message.error = error })

    window.shared.url.pathname = `bookings/vehicle/${this.vehicleId}`
    axios.get(`${window.shared.url}?_format=hal_json`)
      .then(({data: response}) => {
        for (let i = 0; i < response.length; i++) {
          this.state.disabled_startdate.ranges[i] = {
            from: new Date(response[i].name[0].value),
            to: new Date(response[i].field_eind_datum[0].value)
          }
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        console.log(this.data_book.startdate)
        window.shared.url.pathname = 'entity/bookings'
        axios.post(`${window.shared.url}?_format=hal_json`,
          {
            'name': {
              'value': moment(this.data_book.startdate).format('YYYY-MM-DD') + 'T' + this.data_book.starttime + ':00'
            },
            'field_eind_datum': {
              'value': moment(this.data_book.enddate).format('YYYY-MM-DD') + 'T' + this.data_book.endtime + ':00'
            },
            'field_status': {
              'value': 'In afwachting'
            },
            'field_huurder': {
              'target_id': this.userId
            },
            'field_voertuig': {
              'target_id': this.vehicleId
            }
          }, window.shared.headers
        )
          .then(({data: response}) => {
            this.message.succes = 'U heeft succesvol geboekt'
          })
          .catch(({message: error}) => { this.message.error = error })
      })
    },
    enddateDisabled () {
      this.state.disabled_enddate.to = this.data_book.startdate
      let maxdays = this.vehicle.field_verhuurdagen[0].value
      let enddate = moment(this.data_book.startdate).add(maxdays - 1, 'days')
      this.state.disabled_enddate.from = enddate._d
      let stop = false
      for (let i = 0; i < maxdays && !stop; i++) {
        let date = moment(this.data_book.startdate).add(i + 1, 'days')
        let count = 0
        if (this.state.disabled_startdate.dates.length > this.state.disabled_startdate.ranges) {
          count = this.state.disabled_startdate.dates.length
        } else {
          count = this.state.disabled_startdate.ranges.length
        }
        for (let i = 0; i < count && !stop; i++) {
          let formatDate1 = moment(this.state.disabled_startdate.dates[i]).format('YYYY-MM-DD')
          let formatDate2 = moment(this.state.disabled_startdate.ranges[i].from).format('YYYY-MM-DD')
          if (formatDate1 === moment(date).format('YYYY-MM-DD') || formatDate2 === moment(date).format('YYYY-MM-DD')) {
            let newEnddate = moment(date).subtract(1, 'days')
            this.state.disabled_enddate.from = newEnddate._d
            stop = true
          }
        }
      }
    }
  },
  watch: {
    'this.state.disabled_startdate.dates' (newParams) {
      this.state.disabled_startdate.dates = newParams
    }
  }
}
</script>

<style lang="scss">
</style>