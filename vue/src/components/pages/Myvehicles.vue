<template>
    <div class="container">
        <div>
            <h5>Mijn voertuigen:</h5>
            <div v-if="vehicles.length == 0">Je hebt nog geen voertuigen toegevoegd!
              <div class="btn--primary"><router-link to="/vehicles/create/step1" exact>Voertuig toevoegen </router-link></div>
            </div>

            <div v-for="vehicle in vehicles">
                <div class="vehicle">             
                <router-link :to="{ name: 'Detail', params: { id: vehicle.id[0].value }}">
                    <img v-if="vehicle.field_afbeelding_data.length" :src="vehicle.field_afbeelding_data[0].value"> 
                    <p class="price--big"><span class="big">€ {{ vehicle.field_prijs[0].value}}</span>/dag</p>
                    <p class="title">{{ vehicle.name[0].value}} {{ vehicle.field_model[0].value}},
                    {{ vehicle.field_locatie[0].value}}</p> 
                 </router-link>

                 </div>
            </div>
            <div class="message--error">{{message.error}}</div>
            <div class="message--succes">{{message.succes}}</div>
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
      },
      profileId: localStorage.getItem('profileId')
    }
  },
  created () {
    this.$store.state.url.pathname = `vehicles/owner/${this.profileId}`
    axios.get(`${this.$store.state.url}`)
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