<template>
  <div class="container">
     <div class="bookings">
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>
        <div v-for="booking in bookings">
           <div class="request">  
              <i class="fa fa-check request__check--pending" aria-hidden="true"></i>
              <p class="title--request">{{booking.vehicle}}</p>  
              <p class="bold request__adress">Gentsestraat 3 - Gent, België</p>       
              <p class="request__date">van <span class="bold">{{ booking.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ booking.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ booking.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ booking.field_eind_datum[0].value | date("%R")}}</span> </p>
              <p class="request__price"><span class="bold"></span></p>
             <!-- <p>{{request.field_status[0].value}}</p> -->

             {{booking.field_voertuig[0].url}}
           </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
      vehicle: []
    }
  },
  created () {
    // var self = this
    axios.get('http://cmsdev.localhost/bookings?_format=json', {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => {
        this.bookings = response
        for (var i = 0; i < this.bookings.length; i++) {
          var url = this.bookings[i].field_voertuig[0].url
          this.getVehicle(url, i)
        }
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    getVehicle: function (url, i) {
      axios.get(`http://cmsdev.localhost/` + url + `?_format=json`, {
        'header': {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(({data: response}) => {
          this.vehicle = new Array(response)
        })
        .catch(({message: error}) => { this.message.error = error })
    }
  },
  watch: {
    bookings: function (val) {
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