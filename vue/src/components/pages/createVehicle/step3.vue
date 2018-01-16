<template>
    <div class="container">
      <div class="step3">
        <h4 class="title--page">Voorwaarden</h4>   
        <form class="form--create">

          <label for="max_days">Maximum aantal dagen (1-31)</label><br>
          <input name="maximum_dagen" v-validate="'required|numeric|between:1,31'" id="max_days" placeholder="Maximum aantal dagen" v-model="vehicle.data.field_verhuurdagen[0].value"
           :class="{'input': true, 'is-danger': errors.has('maximum_dagen') }"><br>

          <label for="max_kilometers">Maximum aantal kilometers per dag (100-1000)</label><br>
          <input name="maximum_km" v-validate="'required|numeric|between:100,1000'" id="max_kilometers" placeholder="Maximum aantal kilometers" v-model="vehicle.data.field_kilometers_per_dag[0].value"
           :class="{'input': true, 'is-danger': errors.has('maximum_km') }"><br>

          <label for="min_age">Minimum leeftijd (18-21)</label><br>
          <input name="minimum_leeftijd" v-validate="'required|numeric|between:18,21'" id="min_age" placeholder="Mimimum leeftijd" v-model="vehicle.data.field_min_leeftijd[0].value"
           :class="{'input': true, 'is-danger': errors.has('minimum_leeftijd') }"><br>

        <div class="message--succes">{{message.succes}}</div>

          <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>

        <div>
          <div v-if="newVehicle">
            <div class="btn--primary"><a @click="next()"> Volgende</a></div>
          </div>

          <div v-else="newVehicle">
            <div class="btn--primary"><a @click="save()"> Aanpassen</a></div>
          </div> 
        </div>
        </form>
      </div>
    </div>
</template>


<script>
import Main from '../../../main.js'
import Requests from '../../../requests.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step3',
  data: function () {
    return {
      message: Requests.message,
      newVehicle: null,
      vehicle: this.$store.state.create_vehicle
    }
  },
  created: function () {
    Requests.message.error = ''
    Requests.message.succes = ''
    this.newVehicle = Main.checkCreateOrEdit(this.$route)
  },
  methods: {
    next: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.state.create_vehicle.data.field_verhuurdagen[0].value = this.vehicle.data.field_verhuurdagen[0].value
          this.$store.state.create_vehicle.data.field_min_leeftijd[0].value = this.vehicle.data.field_min_leeftijd[0].value
          this.$store.state.create_vehicle.data.field_kilometers_per_dag[0].value = this.vehicle.data.field_kilometers_per_dag[0].value
          this.$router.push({name: 'Step4'})
        }
      })
    },
    save: function () {
      let creds = {
        'field_verhuurdagen': {
          'value': this.vehicle.data.field_verhuurdagen[0].value
        },
        'field_kilometers_per_dag': {
          'value': this.vehicle.data.field_kilometers_per_dag[0].value
        },
        'field_min_leeftijd': {
          'value': this.vehicle.data.field_min_leeftijd[0].value
        }
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          Requests.patchVehicle(this.$route.params.id, creds)
        }
      })
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
