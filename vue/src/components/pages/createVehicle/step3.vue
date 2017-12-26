<template>
    <div class="container">
      <div class="step3">
        <h4 class="title--page">Voorwaarden</h4>   
        <form class="form--create">

          <label for="max_days">Maximum aantal dagen</label><br>
          <input name="max_days" v-validate="'required|numeric|1-31'" id="max_days" placeholder="Maximum aantal dagen" v-model="vehicle.data.field_verhuurdagen[0].value"><br>

          <label for="max_kilometers">Maximum aantal kilometers per dag</label><br>
          <input name="max_kilometers" v-validate="'required|numeric|100-1000'" id="max_kilometers" placeholder="Maximum aantal kilometers" v-model="vehicle.data.field_kilometers_per_dag[0].value"><br>

          <label for="min_age">Minimum leeftijd (18-21)</label><br>
          <input name="min_age" v-validate="'required|numeric|18-21'" id="min_age" placeholder="Mimimum leeftijd" v-model="vehicle.data.field_min_leeftijd[0].value"><br>

        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>


        <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>

        <!-- component? -->  
        <div v-if="this.$validator.validateAll()">
          <div v-if="newVehicle">
            <div class="btn--primary"><a @click="next()"> Volgende</a></div>
          </div>

          <div v-else="newVehicle">
            <div class="btn--primary"><a @click="save()"> Aanpassen</a></div>
          </div> 
        </div>
        <!-- component? -->
        </form>
      </div>
    </div>
</template>


<script>
// import axios from 'axios'
import Main from '../../../main.js'
import Requests from '../../../requests.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step3',
  data: function () {
    return {
      newVehicle: null,
      vehicle: Requests.vehicle
    }
  },
  created: function () {
    this.newVehicle = Main.checkCreateOrEdit(this.$route.params)
  },
  methods: {
    next: function () {
      window.shared.create_vehicle.max_days = this.vehicle.data.field_verhuurdagen[0].value
      window.shared.create_vehicle.min_age = this.vehicle.data.field_min_leeftijd[0].value
      window.shared.create_vehicle.max_kilometers = this.vehicle.data.field_kilometers_per_dag[0].value
      this.$router.push({name: 'Step4'})
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

</style>
