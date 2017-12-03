<template>
    <div class="container">
      <div class="step1">
        <h4 class="title--page">Beschrijving</h4>
        <div class="message--error">{{message.error}}</div>
           <div class="message--succes">{{message.succes}}</div>
        <form class="form--create">

          <label for="merk">Merk</label><br>
          <input name="merk" id="merk" placeholder="Merk" v-model="vehicle.data.name[0].value"><br>

          <label for="model">Model</label><br>
          <input name="model" id="model" placeholder="Model" v-model="vehicle.data.field_model[0].value"><br>

          <label for="geboortedatum">Land van inschrijving</label><br>
          <input name="geboortedatum" id="geboortedatum" placeholder="Land van inschrijving"><br>

          <label for="inschrijvingsjaar">Jaar inschrijving</label><br>
          <input name="inschrijvingsjaar" id="inschrijvingsjaar" placeholder="Jaar inschrijving" v-model="vehicle.data.field_inschrijvingsjaar[0].value"><br>

          <h5>Kenmerken</h5>
          <label for="zitplaatsen">Aantal zitplaatsen</label><br>
          <input name="zitplaatsen" id="zitplaatsen" placeholder="Aantal zitplaatsen" v-model="vehicle.data.field_zitplaatsen[0].value"><br>

          <label for="deuren">Aantal deuren</label><br>
          <input name="deuren" id="deuren" placeholder="Aantal deuren" v-model="vehicle.data.field_deuren[0].value"><br>

          <label for="versnellingsbak">Versnellingsbak</label><br>
          <select name="versnellingsbak" id="versnellingsbak" v-model="vehicle.data.field_versnellingsbak[0].value">
            <option value="" disabled selected>Versnellingsbak</option>
            <option value="Handmatig">Handmatig</option>
            <option value="Automatic">Automatic</option>
          </select>

          <label for="kilometers">Aantal totale kilometers</label><br>
          <input name="kilometers" id="kilometers" placeholder="Aantal totale kilometers" v-model="vehicle.data.field_kilometerstand[0].value"><br>

          <label for="verbruik">Verbruik</label><br>
          <input name="verbruik" id="verbruik" placeholder="Verbruik"><br>

          <div v-if="newVehicle">
            <div class="btn--primary"><a @click="next()"> Volgende</a></div>
          </div>

          <div v-else="newVehicle">
            <div class="btn--primary"><a @click="save()"> Aanpassen</a></div>
          </div> 

           <!-- to="/vehicles/create/step2" -->
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
  name: 'step1',
  data: function () {
    return {
      message: {
        succes: '',
        error: ''
      },
      newVehicle: null,
      vehicle: Requests.vehicle,
      headers: {
        auth: {
          username: 'efiara-user',
          password: 'efiara-pass'
        },
        'header': {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/hal+json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  created: function () {
    this.newVehicle = Main.checkCreateOrEdit(this.$route.params)
  },
  methods: {
    next: function () {
      window.shared.create_vehicle.brand = this.vehicle.data.name[0].value
      window.shared.create_vehicle.model = this.vehicle.data.field_model[0].value
      window.shared.create_vehicle.vehicle_year = this.vehicle.data.field_inschrijvingsjaar[0].value
      window.shared.create_vehicle.seating = this.vehicle.data.field_zitplaatsen[0].value
      window.shared.create_vehicle.doors = this.vehicle.data.field_deuren[0].value
      window.shared.create_vehicle.gearbox = this.vehicle.data.field_versnellingsbak[0].value
      window.shared.create_vehicle.kilometers = this.vehicle.data.field_kilometerstand[0].value
      this.$router.push({name: 'Step2'})
    },
    save: function () {
      let creds = {
        'name': {
          'value': 19
        }
      }
      // Requests.patchVehicle(this.$route.params.id, creds)
      window.shared.url.pathname = `efiara/vehicles/${this.$route.params.id}`
      axios.patch(`${window.shared.url}?_format=hal_json`, creds, this.headers)
        .then(response => {
          this.message.succes = 'Je voertuig is aangepast'
        })
        .catch(error => {
          this.message.error = error
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
