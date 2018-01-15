<template>
    <div class="container">
      <div class="step1">
        <h4 class="title--page">Beschrijving</h4>
        <form class="form--create">

          <label for="merk">Merk</label><br>
          <input name="merk" id="merk" v-validate="'required'" placeholder="Merk" v-model="vehicle.data.name[0].value"  
          :class="{'input': true, 'is-danger': errors.has('merk') }"><br>

          <label for="model">Model</label><br>
          <input name="model" id="model" v-validate="'required'"  placeholder="Model" v-model="vehicle.data.field_model[0].value"
           :class="{'input': true, 'is-danger': errors.has('model') }"><br>

          <label for="inschrijvingsjaar">Jaar inschrijving</label><br>
          <input name="inschrijvingsjaar" v-validate="'required|date_format:YYYY'"  id="inschrijvingsjaar" placeholder="Jaar inschrijving" v-model="vehicle.data.field_inschrijvingsjaar[0].value"
           :class="{'input': true, 'is-danger': errors.has('inschrijvingsjaar') }"><br>

          <h5>Kenmerken</h5>
          <label for="zitplaatsen">Aantal zitplaatsen</label><br>
          <input name="zitplaatsen" v-validate="'required|numeric'"  id="zitplaatsen" placeholder="Aantal zitplaatsen" v-model="vehicle.data.field_zitplaatsen[0].value"
           :class="{'input': true, 'is-danger': errors.has('zitplaatsen') }"><br>

          <label for="deuren">Aantal deuren</label><br>
          <input name="deuren" id="deuren" v-validate="'required|numeric'" placeholder="Aantal deuren" v-model="vehicle.data.field_deuren[0].value"
           :class="{'input': true, 'is-danger': errors.has('deuren') }"><br>

          <label for="versnellingsbak">Versnellingsbak</label><br>
          <select name="versnellingsbak" id="versnellingsbak" v-validate="'required'" v-model="vehicle.data.field_versnellingsbak[0].value"
           :class="{'input': true, 'is-danger': errors.has('versnellingsbak') }">
            <option value="" disabled selected>Versnellingsbak</option>
            <option value="Handmatig">Handmatig</option>
            <option value="Automatic">Automatic</option>
          </select>

          <label for="kilometers">Aantal totale kilometers</label><br>
          <input name="kilometers" v-validate="'required|numeric'" id="kilometers" placeholder="Aantal totale kilometers" v-model="vehicle.data.field_kilometerstand[0].value"
           :class="{'input': true, 'is-danger': errors.has('kilometers') }"
          ><br>

          <label for="opties">Opties</label>
          <select name="opties" placeholder="Opties" v-model="activeOptions" style="height:150px;" multiple><br>
            <option v-for="option in options" :value="option.tid[0].value">
              {{option.name[0].value}}
            </option>
          </select>

          <label for="afbeelding">Afbeelding (maximum 5)</label><br>
          <input name="afbeelding" type="file" id="image" v-on:change="getImages()" placeholder="Afbeelding" multiple="multiple" width="48" height="48"  :class="{'input': true, 'is-danger': errors.has('afbeelding') }">

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
      message: Requests.message,
      countries: {},
      newVehicle: null,
      vehicle: this.$store.state.create_vehicle,
      options: [],
      activeOptions: [],
      images: []
    }
  },
  created: function () {
    Requests.message.error = ''
    Requests.message.succes = ''
    this.newVehicle = Main.checkCreateOrEdit(this.$route)
    this.$store.state.url.pathname = `taxonomie/opties`
    axios.get(`${this.$store.state.url}?_format=hal_json`)
      .then(({data: response}) => { this.options = response })
      .catch(({message: error}) => { this.message.error = error })
    // alert(this.vehicle.data.field_opties.length)
    for (var i = 0; i < this.vehicle.data.field_opties.length; i++) {
      this.getOptions(this.vehicle.data.field_opties[i].url, i)
    }
  },
  methods: {
    next: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.state.create_vehicle.data.name[0].value = this.vehicle.data.name[0].value
          this.$store.state.create_vehicle.data.field_model[0].value = this.vehicle.data.field_model[0].value
          this.$store.state.create_vehicle.data.field_inschrijvingsjaar[0].value = this.vehicle.data.field_inschrijvingsjaar[0].value
          this.$store.state.create_vehicle.data.field_zitplaatsen[0].value = this.vehicle.data.field_zitplaatsen[0].value
          this.$store.state.create_vehicle.data.field_deuren[0].value = this.vehicle.data.field_deuren[0].value
          this.$store.state.create_vehicle.data.field_versnellingsbak[0].value = this.vehicle.data.field_versnellingsbak[0].value
          this.$store.state.create_vehicle.data.field_kilometerstand[0].value = this.vehicle.data.field_kilometerstand[0].value
          for (let i = 0; i < this.activeOptions.length; i++) {
            this.$store.state.create_vehicle.data.field_opties[i] = { 'target_id': this.activeOptions[i] }
          }
          for (let i = 0; i < this.images.length; i++) {
            this.$store.state.create_vehicle.data.field_afbeelding_data[i] = { 'value': this.images[i] }
          }

          this.$router.push({name: 'Step2'})
        }
      })
    },
    save: function () {
      /* eslint-disable camelcase */
      let field_opties = []
      for (let i = 0; i < this.activeOptions.length; i++) {
        field_opties[i] = { 'target_id': this.activeOptions[i] }
      }
      let field_afbeelding_data;
      if (this.images.length) {
        for (let i = 0; i < this.images.length; i++) {
          field_afbeelding_data = []
          field_afbeelding_data[i] = { 'value': this.images[i] }
        }
      } else {
        // field_afbeelding_data = ''
      }
      let creds = {
        'name': {
          'value': this.vehicle.data.name[0].value
        },
        'field_model': {
          'value': this.vehicle.data.field_model[0].value
        },
        'field_inschrijvingsjaar': {
          'value': this.vehicle.data.field_inschrijvingsjaar[0].value
        },
        'field_zitplaatsen': {
          'value': this.vehicle.data.field_zitplaatsen[0].value
        },
        'field_deuren': {
          'value': this.vehicle.data.field_deuren[0].value
        },
        'field_versnellingsbak': {
          'value': this.vehicle.data.field_versnellingsbak[0].value
        },
        'field_kilometerstand': {
          'value': this.vehicle.data.field_kilometerstand[0].value
        },
        field_opties,
        field_afbeelding_data
        }
        // console.log(creds)
        // Requests.patchVehicle(this.$route.params.id, creds)
        this.$validator.validateAll().then((result) => {
          if (result) {
            Requests.patchVehicle(this.$route.params.id, creds)
          }
        })
      /* eslint-enable camelcase */
    },
    getOptions: function (path, i) {
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => {
          this.activeOptions.push(response.tid[0].value)
        })
        .catch(({message: error}) => { this.message.error = error })
    },
    getImages: function () {
      let input = document.getElementById('image')
      let images = []
      if (input.files.length > 5) {
        this.message.error = 'Je kan maar maximum 5 afbeeldingen uploaden'
      } else {
        for (let i = 0; i < input.files.length; i++) {
          let fr = new FileReader()
          fr.onload = function (e) {
            let bfile = e.target.result
            images.push(bfile)
          }
          fr.readAsDataURL(input.files[i])
        }
        this.images = images
        console.log(this.images)
      }
    }
  },
  watch: {
    '$route.params' (newParams) {
      this.newVehicle = Main.checkCreateOrEdit(newParams)
    },
    options: function (newParams) {
      this.options = newParams
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
