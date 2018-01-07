<template>
  <div class="container">
     <div class="register">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">

          <label for="gebruikersnaam">Gebruikersnaam</label><br>
          <input name="gebruikersnaam" id="username" placeholder="Gebruikersnaam" v-validate="'required'" v-model="credentials.username" :class="{'input': true, 'is-danger': errors.has('gebruikersnaam') }"><br>
          
          <label for="voornaam">Voornaam</label><br>
          <input name="voornaam" id="firstname" placeholder="Voornaam" v-validate="'required'" v-model="credentials.firstname" :class="{'input': true, 'is-danger': errors.has('voornaam') }"><br>
          
					<label for="naam">Naam</label><br>
          <input name="naam" id="lastname" placeholder="Naam" v-validate="'required'" v-model="credentials.name" :class="{'input': true, 'is-danger': errors.has('naam') }"><br>
          
					<label for="email">E-mailadres</label><br>
          <input name="email" id="email" placeholder="E-mailadres" v-validate="'required|email'" v-model="credentials.email" :class="{'input': true, 'is-danger': errors.has('email') }"><br>
          
					<label for="wachtwoord">Wachtwoord</label><br>
          <input name="wachtwoord" id="password" type="password" placeholder="Wachtwoord" v-validate="'required'" v-model="credentials.password" :class="{'input': true, 'is-danger': errors.has('wachtwoord') }"><br>
           
					 <label for="bevestiging_wachtwoord">Bevestigen wachtwoord</label><br>
          <input name="bevestiging_wachtwoord" id="confirmPassword" type="password" v-validate="'required|confirmed:wachtwoord'" placeholder="Bevestigen wachtwoord" v-model="confirmPassword" :class="{'input': true, 'is-danger': errors.has('bevestiging_wachtwoord') }"><br>
           
           <label for="telefoonnummer">Telefoonnummer (+32)</label><br>
          <input name="telefoonnummer" id="phonenumber" type="text" placeholder="Telefoonnummer" v-validate="'required|nummeric'" v-model="credentials.phonenumber" :class="{'input': true, 'is-danger': errors.has('telefoonnummer') }"><br>
           
           <label for="geboortedatum">Geboortedatum</label><br>
          <input name="geboortedatum" id="bday" type="date" placeholder="Geboortedatum" v-validate="'required'" v-model="credentials.bday" :class="{'input': true, 'is-danger': errors.has('geboortedatum') }"><br>
           
          <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{user.message.error}}
            </span>
          </div>

					<div class="btn--login"><a @click="register()">Registeren</a></div>
          <div><router-link to="/login" exact><a class="link--login">Aanmelden</a> </router-link></div>
        
          <div class="message--succes">{{user.message.succes}}</div>

        </form>
    </div>
  </div>
</template>

<script>
import Auth from '../../auth.js'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'register',
  data () {
    return {
      credentials: {
        username: '',
        name: '',
        firstname: '',
        bday: '',
        email: '',
        phonenumber: '',
        password: ''
      },
      user: Auth.user,
      confirmPassword: ''
    }
  },
  methods: {
    register () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let creds = {
            'name': {
              'value': this.credentials.username
            },
            'mail': {
              'value': this.credentials.email
            },
            'field_geboortedatum': {
              'value': this.credentials.bday
            },
            'field_naam': {
              'value': this.credentials.name
            },
            'field_voornaam': {
              'value': this.credentials.firstname
            },
            'field_telefoonnummer': {
              'value': this.credentials.phonenumber
            },
            'pass': {
              'value': this.credentials.password
            }
          }

          Auth.register(creds)
        }
      })
    }
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

