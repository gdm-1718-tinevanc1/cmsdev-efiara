<template>
  <div class="container">
     <div class="contact">
        <form class="form--contact">
            <h4 class="title--page">Contacteer ons</h4>
            <p class="center">Opmerkingen, klachten of vragen? </br>
            Stuur ons een bericht: </p>
            <label for="gebruikersnaam">Jouw naam</label><br>
            <input name="gebruikersnaam" id="gebruikersnaam" placeholder="Jouw naam" v-model="creds.name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('gebruikersnaam') }"><br>

            <label for="email">Jouw e-mail</label><br>
            <input name="email" id="email" placeholder="Jouw e-mail" v-model="creds.mail" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('email') }"><br>

            <label for="onderwerp">Onderwerp</label><br>
            <input name="onderwerp" id="onderwerp" placeholder="Onderwerp" v-model="creds.subject" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('onderwerp') }"><br>

            <label for="bericht">Bericht</label><br>
            <textarea name="bericht" id="bericht" placeholder="Bericht" v-model="creds.message" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('bericht') }"></textarea> <br>

            <div class="btn--primary"><a @click="hire">Verstuur</a></div>

        </form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'contact',
  data () {
    return {
      creds: {
        name: '',
        mail: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">


</style>