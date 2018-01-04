<template>
    <div class="container">
      <div class="menu">
          <div class="col box">
            <router-link :to="{ name: 'Edit_Step1', params: { id: this.$route.params.id}}">Beschrijving</router-link>
          </div>
          <div class="col s6 box left">
              <router-link :to="{ name: 'Edit_Step2', params: { id: this.$route.params.id}}">Adres</router-link>
          </div>
          <div class="col s6 box right">
              <router-link :to="{ name: 'Edit_Step3', params: { id: this.$route.params.id}}">Voorwaarden</router-link>
          </div>
            <div class="col box">
              <router-link :to="{ name: 'Edit_Step4', params: { id: this.$route.params.id}}">Beschikbaarheid</router-link>
              </div>
        </div>
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>

        <div v-if="!newVehicle">
          <div class="btn--error"><a @click="deleteVehicle()">Verwijder</a></div>
        </div> 
    </div>
</template>


<script>
import axios from 'axios'
import Main from '../../../main.js'
// import Requests from '../../../requests.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'menu',
  data: function () {
    return {
      newVehicle: null,
      vehicleId: this.$route.params.id,
      message: {
        succes: '',
        error: ''
      },
      vehicle: this.$store.state.create_vehicle
    }
  },
  created: function () {
    this.newVehicle = Main.checkCreateOrEdit(this.$route.params)
  },
  methods: {
    deleteVehicle: function () {
      if (confirm(`Ben je zeker dat je '${this.vehicle.data.name[0].value}' wilt verwijderen?`)) {
        this.$store.state.url.pathname = `efiara/vehicles/${this.vehicleId}`
        axios.delete(`${this.$store.state.url}?_format=hal_json`, this.$store.state.headers)
          .then(({data: response}) => {
            this.message.succes = 'Je voertuig is verwijderd!'
            this.$router.push({name: 'MyVehicles'})
          })
          .catch(({message: error}) => { this.message.error = error })
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
