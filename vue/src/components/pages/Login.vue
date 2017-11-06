<template>
  <div class="container">
     <div class="login">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">
          <label for="email">E-mailadres</label><br>
          <input name="email" id="email" placeholder="E-mailadres" v-model="credentials.email"><br>
          <label for="password">Wachtwoord</label><br>
          <input name="password" id="password" type="password" placeholder="Wachtwoord" v-model="credentials.password"><br>
           <div class="btn--login"><a @click="submit()">Aanmelden</a></div>
          <router-link to="/register" exact><a class="link--login">Registreren</a> </router-link>
        </form>
    </div>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
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