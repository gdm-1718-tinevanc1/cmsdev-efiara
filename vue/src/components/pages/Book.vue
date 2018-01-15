<template>
  <div class="container">
     <div class="book">
        <form class="form--book">
          <p class="book--title">{{vehicle.name[0].value}} {{vehicle.field_model[0].value}} </p>
          <label for="begindatum">Begin datum</label><br>
          <datepicker v-on:selected="getStartdate" v-validate="'required'" v-model="data_book.startdate" :disabled="state.disabled_startdate" v-on:closed="enddateDisabled" language="nl" type="date" name="begindatum" id="begindate" placeholder="Begin datum" :class="{'input': true, 'is-danger': errors.has('begindatum') }"></datepicker>

          <label for="begintijd">Start uur</label><br>          
          <input v-validate="'required'" type="time" name="begintijd" id="begintime" v-model="data_book.starttime" :class="{'input': true, 'is-danger': errors.has('begintijd') }">

          <label for="einddatum">Eind datum</label><br>
          <datepicker v-on:selected="getEnddate" v-validate="'required'"v-model="data_book.enddate" :disabled="state.disabled_enddate" type="date" name="enddate" id="einddatum" placeholder="Eind datum" :open-date="data_book.startdate" :class="{'input': true, 'is-danger': errors.has('einddatum') }"></datepicker>

          <label for="eindtijd">Eind uur</label><br>          
          <input v-validate="'required'" type="time" name="eindtijd" id="endtime" v-model="data_book.endtime" :class="{'input': true, 'is-danger': errors.has('eindtijd') }">

          <p class="book--price">Prijs: € {{ vehicle.field_prijs[0].value}} /dag </p>
          <p class="book--price" v-if="price">Totale prijs: € {{ price }} </p>

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
import Datepicker from 'vuejs-datepicker'
import * as moment from 'moment'
import axios from 'axios'
/* import axios from 'axios'
import * as moment from 'moment'
Vue.use(require('vue-moment')) */

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'book',
  components: {
    Datepicker
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
          to: new Date(),
          dates: [],
          ranges: []
        },
        disabled_enddate: {
          to: new Date(),
          from: new Date()
        }
      },
      price: null
    }
  },
  created () {
    this.$store.state.url.pathname = `bookings_active/vehicle/${this.vehicleId}/goedgekeurd,in+afwachting`
    axios.get(`${this.$store.state.url}?_format=hal_json`)
      .then(({data: response}) => {
        this.getVehicle()
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
        this.$store.state.url.pathname = 'entity/bookings'
        axios.post(`${this.$store.state.url}?_format=hal_json`,
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
            'field_prijs': {
              'value': this.price
            },
            'field_huurder': {
              'target_id': this.userId
            },
            'field_voertuig': {
              'target_id': this.vehicleId
            }
          }, this.$store.state.headers
        )
          .then(({data: response}) => {
            this.message.succes = 'U heeft succesvol geboekt'
            this.$router.push({name: 'Bookings'})
          })
          .catch(({message: error}) => { this.message.error = error })
      })
    },
    getVehicle () {
      this.$store.state.url.pathname = `efiara/vehicles/${this.vehicleId}`
      axios.get(`${this.$store.state.url}?_format=hal_json`)
        .then(({data: response}) => {
          this.vehicle = response
          if (response.field_niet_beschikbaar) {
            for (let i = 0; i < response.field_niet_beschikbaar.length; i++) {
              this.state.disabled_startdate.dates[i] = new Date(response.field_niet_beschikbaar[i].value)
            }
          }
        })
        .catch(({message: error}) => { this.message.error = error })
    },
    enddateDisabled () {
      this.state.disabled_enddate.to = this.data_book.startdate
      let maxdays = this.vehicle.field_verhuurdagen[0].value
      let enddate = moment(this.data_book.startdate).add(maxdays - 1, 'days')
      // console.log(this.state.disabled_enddate)
      this.state.disabled_enddate.from = enddate._d
      let stop = false
      for (let i = 0; i < maxdays && !stop; i++) {
        let date = moment(this.data_book.startdate).add(i, 'days')
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
    },
    getStartdate (date) {
      this.data_book.startdate = date
      this.calculatePrice()
    },
    getEnddate (date) {
      this.data_book.enddate = date
      this.calculatePrice()
    },
    calculatePrice () {
      if (this.data_book.startdate && this.data_book.enddate) {
        var startdate = moment(this.data_book.startdate)
        var enddate = moment(this.data_book.enddate)
        var diff = Math.abs(startdate.diff(enddate, 'days')) + 1
        this.price = this.vehicle.field_prijs[0].value * diff
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
body.background--image{
  margin: 0;
  background-image: url("../../assets/background.png");
  background-color: #000000;
  color: #ffffff
}
</style>