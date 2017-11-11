<template>
  <div class="container">
     <div class="login">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">
          <label for="email">E-mailadres</label><br>
          <input name="email" id="email" placeholder="E-mailadres" v-model="credentials.email"><br>
          <label for="password">Wachtwoord</label><br>
          <input name="password" id="password" type="password" placeholder="Wachtwoord" v-model="credentials.password"><br>
           <div class="btn--login"><a @click="login()">Aanmelden</a></div>
          <router-link to="/register" exact><a class="link--login">Registreren</a> </router-link>
        </form>
        <div class="message--error">{{message.error}}</div>
        <div class="message--succes">{{message.succes}}</div>


    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'login',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      message: {
        error: '',
        succes: ''
      }
    }
  },
  methods: {
    login () {
      axios.post(`http://cmsdev.localhost/user/login?_format=hal_json`, {
        '_links': {
          'type': {
            'href': 'http://cmsdev.localhost/rest/type/user/user'
          }
        },
        'name': {
          'value': 'root'
        },
        'pass': {
          'value': 'secret'
        }
      }).then(response => { this.message.succes = 'Ingelogd.' })
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