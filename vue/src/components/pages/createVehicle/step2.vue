<template>
    <div class="container">
      <div class="step2">
        <h4 class="title--page">Adres</h4>
        <form class="form--create">

          <label for="straat">Straat</label><br>
          <input name="straat" id="straat" placeholder="Straat" v-model="vehicle.street"><br>

          <label for="nummer">Nummer</label><br>
          <input name="nummer" id="nummer" placeholder="Nummer" type="number" v-model="vehicle.number"><br>

          <label for="plaats">Plaats</label><br>
          <input name="plaats" v-validate="'required'" id="plaats" placeholder="Plaats" v-model="vehicle.data.field_locatie[0].value"><br>

          <label for="Land">Land</label><br>
          <input name="Land" id="Land" placeholder="Land" v-model="vehicle.country"><br>

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
  name: 'step2',
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
      window.shared.create_vehicle.street = this.vehicle.street
      window.shared.create_vehicle.number = this.vehicle.number
      window.shared.create_vehicle.place = this.vehicle.data.field_locatie[0].value
      window.shared.create_vehicle.country = this.vehicle.country
      this.$router.push({name: 'Step3'})
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
