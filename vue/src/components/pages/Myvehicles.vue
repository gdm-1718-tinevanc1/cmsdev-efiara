<template>
    <div class="container">
        <div>
            <h5>Mijn voertuigen:</h5>
            <div v-for="vehicle in vehicles">
                <div class="vehicle">             
                <router-link :to="{ name: 'Detail', params: { id: vehicle.id[0].value }}">
                    <img :src="vehicle.field_afbeelding[0].url"> 
                    <p class="price--big"><span class="big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
                    <p class="title">{{ vehicle.name[0].value}} {{ vehicle.field_model[0].value}},
                    {{ vehicle.field_locatie[0].value}}</p> 
                 </router-link>

                 </div>
            </div>
            <div class="message">{{message.error}}</div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'myvehicles',
  data: function () {
    return {
      vehicles: [],
      message: {
        error: '',
        succes: ''
      }
    }
  },
  created () {
    axios.get('http://cmsdev.localhost/vehicles?_format=json', {
      'header': {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(({data: response}) => { this.vehicles = response })
      .catch(({message: error}) => { this.message.error = error })
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