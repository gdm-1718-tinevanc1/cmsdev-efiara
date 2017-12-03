<template>
  <div class="container">
     <div class="book">
        <form class="form--book">
          <p class="bookVehicle">Voertuig</p>
          <label for="begindate">Begin datum</label><br>
          <input type="date" name="begindate" id="begindate" placeholder="Begin datum" v-model="data_book.startdate"><br>

          <label for="begindate">Start uur</label><br>          
          <input type="time" name="begintime" id="begintime" v-model="data_book.starttime">

          <label for="enddate">Eind datum</label><br>
          <input type="date" name="enddate" id="enddate" placeholder="Eind datum" v-model="data_book.enddate"><br>

          <label for="begindate">Eind uur</label><br>          
          <input type="time" name="endtime" id="endtime" v-model="data_book.endtime">

           <div class="btn--primary"><a @click="submit()">Huur dit voertuig nu!</a></div>
           <div class="message--error">{{message.error}}</div>
           <div class="message--succes">{{message.succes}}</div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'book',
  data () {
    return {
      vehicleId: localStorage.getItem('Book_vehicleId'),
      userId: localStorage.getItem('profileId'),
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
      }
    }
  },
  methods: {
    submit: function () {
      window.shared.url.pathname = 'entity/bookings'
      axios.post(`${window.shared.url}?_format=hal_json`,
        {
          'name': {
            'value': this.data_book.startdate + 'T' + this.data_book.starttime + ':00'
          },
          'field_eind_datum': {
            'value': this.data_book.enddate + 'T' + this.data_book.endtime + ':00'
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
    }
  }
}
</script>

<style lang="scss">
</style>