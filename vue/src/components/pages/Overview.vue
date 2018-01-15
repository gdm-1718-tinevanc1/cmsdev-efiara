<template>
    <div class="container">
        <div>
            <h5>Voertuigen:</h5>
            <div v-for="vehicle in vehicles" >
                <div class="vehicle" v-if="vehicle.available" >            
                <router-link :to="{ name: 'Detail' , params: { id: vehicle.id[0].value }}">
                    <img v-if="vehicle.field_afbeelding_data.length" :src="vehicle.field_afbeelding_data[0].value"> 
                    <p class="price--big"><span class="big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
                    <p class="title">{{ vehicle.name[0].value}} {{ vehicle.field_model[0].value}},
                    {{ vehicle.field_locatie[0].value}}</p> 
                 </router-link>
                 </div>
              <div class="message--error">{{message.error}}</div>
              <div class="message--succes">{{message.succes}}</div>
            </div>
            <div v-if="vehicles.length == 0">Er zijn geen voertuigen beschikbaar volgens jouw wensen.</div>
            {{test}}
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import * as moment from 'moment'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'overview',
  data: function () {
    return {
      vehicles: {},
      message: {
        error: '',
        succes: ''
      },
      test: '',
      startdate: this.$route.params.startdate,
      enddate: this.$route.params.enddate
    }
  },
  created () {
    this.$store.state.url.pathname = `vehicles/place/${this.$route.params.place}`
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.vehicles = response
        let self = this
        for (let i = 0; i < response.length; i++) {
          let startdate = moment(this.startdate).format('YYYY-MM-DD')
          let enddate = moment(this.enddate).format('YYYY-MM-DD')
          let range = moment.range(startdate, enddate)

          if (response[i].field_niet_beschikbaar.length) {
            for (let j = 0; j < response[i].field_niet_beschikbaar.length; j++) {
              let fieldbeschikbaar = moment(response[i].field_niet_beschikbaar[j].value).format('YYYY-MM-DD')

              if (fieldbeschikbaar !== startdate && fieldbeschikbaar !== enddate && !range.contains(moment(fieldbeschikbaar))) {
                self.vehicles[i].available = true
              } else {
                self.vehicles[i].available = false
                break
              }
            }
          } else {
            self.vehicles[i].available = true
          }
          this.getBookings(response[i].id[0].value, range, i)
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    getBookings (idVehicle, rangeHome, i) {
      this.$store.state.url.pathname = `bookings/vehicle/${idVehicle}`
      axios.get(`${this.$store.state.url}?_format=hal_json`)
        .then(({data: response}) => {
          for (let l = 0; l < response.length; l++) {
            this.vehicles[i].booking = [response]
            let startdate = moment(response[l].name[0].value).format('YYYY-MM-DD')
            let enddate = moment(response[l].field_eind_datum[0].value).format('YYYY-MM-DD')
            let rangeBooking = moment.range(startdate, enddate)

            if (this.vehicles[i].available === true && !rangeBooking.overlaps(rangeHome)) {
              this.vehicles[i].available = true
            } else {
              this.vehicles[i].available = false
              // this.$set(this.vehicles[i].available, false)
              this.test = ' '
              // this.$set(this.test, 'test')
              break
            }
          }
        })
        .catch(({message: error}) => { this.message.error = error })
    }
  },
  watch: {
    /* vehicles: {
      handler: function (val) {
        this.vehicles = val
        console.log(val)
        console.log(val[1].available)
      },
      deep: true
    },
    test (val) {
      alert('test')
      this.test = val
      alert('2:', this.test)
    } */
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
