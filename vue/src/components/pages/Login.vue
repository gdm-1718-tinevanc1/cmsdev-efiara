<template>
  <div class="container">
     <div class="login">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">
          <label for="gebruikersnaam">Gebruikersnaam</label><br>
          <input name="gebruikersnaam" id="gebruikersnaam" placeholder="Gebruikersnaam" v-validate="'required'" v-model="credentials.username" :class="{'input': true, 'is-danger': errors.has('gebruikersnaam') }"><br>
          <label for="wachtwoord">Wachtwoord</label><br>
          <input name="wachtwoord" id="wachtwoord" type="password" placeholder="Wachtwoord" v-validate="'required'" v-model="credentials.password" :class="{'input': true, 'is-danger': errors.has('wachtwoord') }"><br>
           <div class="btn--login"><a @click="login()">Aanmelden</a></div>
          <router-link to="/register" exact><a class="link--login">Registreren</a> </router-link>
        </form>

        <div class="message--error"> <br>
          <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
          <span v-if="!errors.any()">
            {{user.message.error}}
          </span>
        </div>
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