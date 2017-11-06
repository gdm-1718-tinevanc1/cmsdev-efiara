<template>
  <div class="container">
     <div class="register">
        <img class="logo--big" src="../../assets/logo.png">
        <form class="form--login">

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
           
					 <div class="btn--login"><a @click="submit()">Registeren</a></div>
          <router-link to="/login" exact><a class="link--login">Aanmelden</a> </router-link>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'register',
  data () {
    return {
      credentials: {
        name: '',
        firstname: '',
        email: '',
        password: ''
      },
      confirmPassword: ''
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

