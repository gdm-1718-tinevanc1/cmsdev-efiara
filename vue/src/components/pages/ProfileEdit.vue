<template>
  <div class="container">
     <div class="profileEdit">
        <h4 class="title--page">Mijn profiel</h4>
         <form class="form--profile">
          <label for="gebruikersnaam">Gebruikersnaam</label><br>
          <input name="gebruikersnaam" id="gebruikersnaam" placeholder="Naam" v-model="creds.name[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('username') }"><br>

          <label for="naam">Naam</label><br>
          <input name="naam" id="naam" placeholder="Naam" v-model="creds.field_naam[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('naam') }"><br>

          <label for="voornaam">Voornaam</label><br>
          <input name="voornaam" id="voornaam" placeholder="Voornaam" v-model="creds.field_voornaam[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('voornaam') }"><br>

          <label for="geboortedatum">Geboortedatum</label><br>
          <input name="geboortedatum" type="date" id="geboortedatum" placeholder="Geboortedatum" v-model="creds.field_geboortedatum[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('geboortedatum') }"><br>

          <h5>Rijbewijs</h5>
          <label for="rijbewijsnummer">Rijbewijsnummer</label><br>
          <input name="rijbewijsnummer" id="rijbewijsnummer" placeholder="Rijbewijsnummer" v-model="creds.field_rijbewijsnummer[0].value" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('rijbewijsnummer') }"><br>

          <label for="uitgiftdatum">Uitgiftedatum</label><br>
          <input name="uitgiftdatum" id="uitgiftdatum" placeholder="Uitgiftedatum" type="date" v-model="creds.field_uitgiftedatum[0].value" :class="{'input': true, 'is-danger': errors.has('uitgiftdatum') }"><br>

          <label for="landuitgifte">Land van uitgifte</label>
          <select name="landuitgifte" placeholder="Land van uitgifte" v-model="creds.field_land_uitgifte[0].target_id" 
           :class="{'input': true, 'is-danger': errors.has('landuitgifte') }"><br>
              <option value="" disabled>Kies het land</option>
              <option v-for="country in countries" :value="country.tid[0].value">
                {{country.name[0].value}}
              </option>
          </select>


          <h5>Contact</h5>
          <label for="email">E-mail</label><br> <!-- v-validate="'required|email'" -->
          <input name="email" id="email" placeholder="E-mail" :class="{'input': true, 'is-danger': errors.has('email') }"><br>

          <label for="telefoonnummer">Telefoonnummer (+32)</label><br>
          <input name="telefoonnummer" id="nummer" placeholder="Telefoonnummer" v-model="creds.field_telefoonnummer[0].value" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('telefoonnummer') }"><br>

          <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>
          <div class="message--succes">{{message.succes}}</div>

           <div class="btn--primary"><a @click="submit()">Aanpassen</a></div>
           
        </form>
    </div>
  </div>
</template>

<script>
// import Auth from '../../auth.js'
import axios from 'axios'
import Requests from '../../requests.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'profileEdit',
  data () {
    return {
      user: [],
      creds: {
        'name': [ {
          'value': ''
        } ],
        'field_naam': [ {
          'value': ''
        } ],
        'field_voornaam': [ {
          'value': ''
        } ],
        'field_telefoonnummer': [ {
          'value': ''
        } ],
        'field_geboortedatum': [ {
          'value': ''
        } ],
        'field_rijbewijsnummer': [ {
          'value': ''
        } ],
        'field_uitgiftedatum': [ {
          'value': ''
        } ],
        'field_land_uitgifte': [ {
          'target_id': ''
        } ]/* ,
        'mail': [ {
          'value': ''
        } ], */
      },
      message: {
        error: '',
        succes: ''
      },
      countries: Requests.countries,
      profileId: localStorage.getItem('profileId')
    }
  },
  created () {
    Requests.getCountries()
    this.$store.state.url.pathname = `user/${this.profileId}`
    axios.get(`${this.$store.state.url}?_format=json`)
      .then(({data: response}) => {
        this.user = response
        this.creds.name[0].value = response.name[0].value
        this.creds.field_naam[0].value = response.field_naam[0].value
        this.creds.field_voornaam[0].value = response.field_voornaam[0].value
        this.creds.field_telefoonnummer[0].value = response.field_telefoonnummer[0].value
        this.creds.field_geboortedatum[0].value = response.field_geboortedatum[0].value
        // this.creds.mail[0].value = response.mail[0].value
        if (response.field_rijbewijsnummer[0]) {
          this.creds.field_rijbewijsnummer[0].value = response.field_rijbewijsnummer[0].value
        } else {
          this.creds.field_rijbewijsnummer[0].value = response.field_rijbewijsnummer
        }
        if (response.field_uitgiftedatum[0]) {
          this.creds.field_uitgiftedatum[0].value = response.field_uitgiftedatum[0].value
        } else {
          this.creds.field_uitgiftedatum[0].value = response.field_uitgiftedatum
        }
        if (response.field_land_uitgifte[0]) {
          this.creds.field_land_uitgifte[0].target_id = response.field_land_uitgifte[0].target_id
        } else {
          this.creds.field_land_uitgifte[0].target_id = response.field_land_uitgifte
        }
      })
      .catch(({message: error}) => { this.message.error = error })

    this.$store.state.url.pathname = `taxonomie/landen`
    axios.get(`${this.$store.state.url}?_format=hal_json`)
      .then(({data: response}) => { this.countries = response })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.checkAuth) {
            this.$store.state.url.pathname = `user/${this.profileId}`
            axios.patch(`${this.$store.state.url}?_format=hal_json`, this.creds, this.$store.state.headers)
              .then(response => {
                this.message.succes = 'Je profiel is aangepast'
              })
              .catch(error => {
                this.message.error = error
              })
          } else {
            this.message.error = 'Je kan dit profiel niet aanpassen.'
          }
        }
      })
    }
  },
  computed: {
    checkAuth: function () {
      let profileId = this.$route.params.id
      let userId = localStorage.getItem('profileId')
      if (profileId === userId) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">


</style>