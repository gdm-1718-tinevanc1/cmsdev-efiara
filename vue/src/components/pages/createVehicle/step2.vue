<template>
    <div class="container">
      <div class="step2">
        <h4 class="title--page">Adres</h4>
        <form class="form--create">

          <label for="straat">Straat</label><br>
          <input name="straat" id="straat" v-validate="'required'" placeholder="Straat" v-model="vehicle.data.field_straat[0].value"
           :class="{'input': true, 'is-danger': errors.has('straat') }"><br>

          <label for="nummer">Huisnummer</label><br>
          <input name="huisnummer" id="huisnummer" v-validate="'required|numeric'" placeholder="Huisnummer" type="number" v-model="vehicle.data.field_huisnummer[0].value"
           :class="{'input': true, 'is-danger': errors.has('huisnummer') }"><br>

          <label for="plaats">Plaats</label><br>
          <input name="plaats" v-validate="'required'" id="plaats" placeholder="Plaats" v-model="vehicle.data.field_locatie[0].value"
           :class="{'input': true, 'is-danger': errors.has('plaats') }"><br>

          <label for="land">Land</label>
          <select name="land" v-validate="'required'" placeholder="Land" v-model="vehicle.data.field_land[0].target_id" 
           :class="{'input': true, 'is-danger': errors.has('land') }"><br>
              <option value="" disabled>Kies jouw land</option>
              <option v-for="country in countries" :value="country.tid[0].value">
                {{country.name[0].value}}
              </option>
          </select>


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
          <div>
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
import axios from 'axios'
import Main from '../../../main.js'
import Requests from '../../../requests.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step2',
  data: function () {
    return {
      message: Requests.message,
      newVehicle: null,
      vehicle: this.$store.state.create_vehicle,
      countries: []
    }
  },
  created: function () {
    Requests.message.error = ''
    Requests.message.succes = ''
    Requests.getCountries()
    this.newVehicle = Main.checkCreateOrEdit(this.$route)

    this.$store.state.url.pathname = `taxonomie/landen`
    axios.get(`${this.$store.state.url}?_format=hal_json`)
      .then(({data: response}) => { this.countries = response })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    next: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.state.create_vehicle.data.field_straat[0].value = this.vehicle.data.field_straat[0].value
          this.$store.state.create_vehicle.data.field_huisnummer[0].value = this.vehicle.data.field_huisnummer[0].value
          this.$store.state.create_vehicle.data.field_locatie[0].value = this.vehicle.data.field_locatie[0].value
          this.$store.state.create_vehicle.data.field_land[0].value = this.vehicle.data.field_land[0].target_id
          this.$router.push({name: 'Step3'})
        }
      })
    },
    save: function () {
      let creds = {
        'field_straat': {
          'value': this.vehicle.data.field_straat[0].value
        },
        'field_huisnummer': {
          'value': this.vehicle.data.field_huisnummer[0].value
        },
        'field_locatie': {
          'value': this.vehicle.data.field_locatie[0].value
        },
        'field_land': {
          'target_id': this.vehicle.data.field_land[0].target_id
        }
      }
      // Requests.patchVehicle(this.$route.params.id, creds)
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

</style>
