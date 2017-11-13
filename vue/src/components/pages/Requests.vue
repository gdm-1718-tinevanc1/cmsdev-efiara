<template>
  <div class="container">
     <div class="requests">
        <h4 class="title--page">Aanvragen</h4>
        <div :for="request in requests">
           <div class="request">    
           <i class="fa fa-check request__check--pending" aria-hidden="true"></i>
              <p class="title--request">Volkswagen Jeta, Gent</p>  
              <p class="bold request__adress">Gentsestraat 3 - Gent, België</p>       
              <p class="request__date">van <span class="bold">{{ request.name[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.name[0].value | date("%R")}}</span> 
              tot <span class="bold">{{ request.field_eind_datum[0].value | date("%a %d %b. %Y") }} </span> om <span class="bold">{{ request.field_eind_datum[0].value | date("%R")}}</span> </p>
              <p class="request__price"><span class="bold">€150/km</span></p>
             <!-- <p>{{request.field_status[0].value}}</p> -->
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
  name: 'requests',
  data () {
    return {
      requests: []
    }
  },
  created () {
    axios.get('http://cmsdev.localhost/bookings/?_format=hal_json', {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => { this.requests = response })
      .catch(({message: error}) => { this.message = error })
  },
  methods: {
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

