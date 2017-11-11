<template>
  <div class="container">
     <div class="register">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">

          <label for="username">Gebruikersnaam</label><br>
          <input name="username" id="username" placeholder="Gebruikersnaam" v-model="credentials.username"><br>
          
          <label for="firstname">Voornaam</label><br>
          <input name="firstname" id="firstname" placeholder="Voornaam" v-model="credentials.firstname"><br>
          
					<label for="lastname">Naam</label><br>
          <input name="lastname" id="lastname" placeholder="Naam" v-model="credentials.name"><br>
          
					<label for="email">E-mailadres</label><br>
          <input name="email" id="email" placeholder="E-mailadres" v-model="credentials.email"><br>
          
					<label for="password">Wachtwoord</label><br>
          <input name="password" id="password" type="password" placeholder="Wachtwoord" v-model="credentials.password"><br>
           
					 <label for="confirmPassword">Bevestigen wachtwoord</label><br>
          <input name="confirmPassword" id="confirmPassword" type="password" placeholder="Bevestigen wachtwoord" v-model="confirmPassword"><br>
           
           <label for="phonenumber">Telefoonnummer</label><br>
          <input name="phonenumber" id="phonenumber" type="text" placeholder="Telefoonnummer" v-model="credentials.phonenumber"><br>
           
           <label for="bday">Geboortedatum</label><br>
          <input name="bday" id="bday" type="date" placeholder="Geboortedatum" v-model="credentials.bday"><br>
           
          <div class="message--error">{{message.error}}</div>
          <div class="message--succes">{{message.succes}}</div>


					 <div class="btn--login"><a @click="register()">Registeren</a></div>
           <div><router-link to="/login" exact><a class="link--login">Aanmelden</a> </router-link></div>

        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      message: {
        error: '',
        succes: ''
      },
      confirmPassword: ''
    }
  },
  methods: {
    register () {
      axios.post(`http://cmsdev.localhost/user/register?_format=hal_json`, {
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
      }).then(response => { this.message.succes = 'Geregistreerd.' })
        .catch(error => { this.message.error = error.response.data })
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

