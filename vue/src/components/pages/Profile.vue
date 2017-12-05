<template>
  <div class="container">
     <div class="profile">
        <h4 class="title--page">Mijn profiel</h4>
         <form class="form--profile">
          <label for="gebruikersnaam">Gebruikersnaam</label><br>
          <input name="gebruikersnaam" id="gebruikersnaam" placeholder="Naam" v-model="user.name[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('username') }"><br>

          <label for="naam">Naam</label><br>
          <input name="naam" id="naam" placeholder="Naam" v-model="user.field_naam[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('naam') }"><br>

          <label for="voornaam">Voornaam</label><br>
          <input name="voornaam" id="voornaam" placeholder="Voornaam" v-model="user.field_voornaam[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('voornaam') }"><br>

          <label for="geboortedatum">Geboortedatum</label><br>
          <input name="geboortedatum" id="geboortedatum" placeholder="Geboortedatum" v-model="user.field_geboortedatum[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('geboortedatum') }"><br>

          <h5>Rijbewijs</h5>
          <label for="rijbewijsnummer">Rijbewijsnummer</label><br>
          <input name="rijbewijsnummer" id="rijbewijsnummer" placeholder="Rijbewijsnummer" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('rijbewijsnummer') }"><br>

          <label for="uitgiftdatum">Uitgiftedatum</label><br>
          <input name="uitgiftdatum" id="uitgiftdatum" placeholder="Uitgiftedatum" v-validate="'required|date'" :class="{'input': true, 'is-danger': errors.has('uitgiftdatum') }"><br>

          <label for="landuitgifte">Land van uitgifte</label><br>
          <input name="landuitgifte" id="landuitgifte" placeholder="Land van uitgifte" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('landuitgifte') }"><br>

          <h5>Contact</h5>
          <label for="email">E-mail</label><br>
          <input name="email" id="email" placeholder="E-mail" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"><br>

          <label for="telefoonnummer">Nummer</label><br>
          <input name="telefoonnummer" id="nummer" placeholder="Nummer" v-model="user.field_telefoonnummer[0].value" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('telefoonnummer') }"><br>

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

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'profile',
  data () {
    return {
      user: {
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
        } ]
      },
      message: {
        error: '',
        succes: ''
      },
      profileId: localStorage.getItem('profileId')
    }
  },
  created () {
    window.shared.url.pathname = `user/${this.profileId}`
    axios.get(`${window.shared.url}?_format=json`)
      .then(({data: response}) => {
        this.user = response
      })
      .catch(({message: error}) => { this.message.error = error })
  },
  methods: {
    submit: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.checkAuth) {
            window.shared.url.pathname = `user/${this.profileId}`
            axios.patch(`${window.shared.url}?_format=hal_json`,
              {
                'field_geboortedatum': {
                  'value': this.user.field_geboortedatum[0].value
                },
                'name': {
                  'value': this.user.name[0].value
                },
                'field_naam': {
                  'value': this.user.field_naam[0].value
                },
                'field_voornaam': {
                  'value': this.user.field_voornaam[0].value
                },
                'field_telefoonnummer': {
                  'value': this.user.field_telefoonnummer[0].value
                }
              }, window.shared.headers
            )
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