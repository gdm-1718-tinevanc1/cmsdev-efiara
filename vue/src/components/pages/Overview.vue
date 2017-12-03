<template>
    <div class="container">
        <div>
            <h5>Voertuigen:</h5>
            <div v-for="vehicle in vehicles">
                <div class="vehicle">            
                <router-link :to="{ name: 'Detail' , params: { id: vehicle.id[0].value }}">
                    <img v-if="vehicle.field_afbeelding.length" :src="vehicle.field_afbeelding[0].url"> 
                    <p class="price--big"><span class="big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
                    <p class="title">{{ vehicle.name[0].value}} {{ vehicle.field_model[0].value}},
                    {{ vehicle.field_locatie[0].value}}</p> 
                 </router-link>
                 </div>
              <div class="message--error">{{message.error}}</div>
              <div class="message--succes">{{message.succes}}</div>
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
  name: 'overview',
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
    window.shared.url.pathname = `vehicles/place/${this.$route.params.place}`
    // http://cmsdev.localhost/vehicles/place/Roeselare?_format=json
    axios.get(`${window.shared.url}?_format=json`)
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
