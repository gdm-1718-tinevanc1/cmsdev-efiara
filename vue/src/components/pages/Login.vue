<template>
  <div class="container">
     <div class="login">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">
          <label for="username">Gebruikersnaam</label><br>
          <input name="username" id="username" placeholder="Gebruikersnaam" v-model="credentials.username"><br>
          <label for="password">Wachtwoord</label><br>
          <input name="password" id="password" type="password" placeholder="Wachtwoord" v-model="credentials.password"><br>
           <div class="btn--login"><a @click="login()">Aanmelden</a></div>
          <router-link to="/register" exact><a class="link--login">Registreren</a> </router-link>
        </form>
        <div class="message--error">{{user.message.error}}</div>
        <div class="message--succes">{{user.message.succes}}</div>


    </div>
  </div>
</template>

<script>
import Auth from '../../auth.js'
export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      user: Auth.user
    }
  },
  methods: {
    login () {
      let credentials = {'name': this.credentials.username, 'pass': this.credentials.password}
      Auth.login(credentials)
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