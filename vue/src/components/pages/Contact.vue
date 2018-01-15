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

            <div class="message--succes">{{message.succes}}</div>
            <div class="message--error"> <br>
              <ul v-for="error in errors.all()">
                <li>{{error}}</li>
              </ul>
              <span v-if="!errors.any()">
                {{message.error}}
              </span>
            </div>
            <div class="btn--primary"><a @click="submit()">Verstuur</a></div>

        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Auth from '../../auth.js'
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
      },
      message: {
        error: '',
        succes: ''
      }
    }
  },
  methods: {
    submit: function () {
      if (Auth.user.authenticated) {
        this.$validator.validateAll().then((result) => {
          this.$store.state.url.pathname = 'entity/contact_message'
          axios.post(`${this.$store.state.url}?_format=hal_json`,
            {
              "contact_form": [{
                "target_id": "feedback_front"
              }],
              'name': {
                'value': this.creds.name
              },
              'mail': {
                'value': this.creds.mail
              },
              'subject': {
                'value': this.creds.subject
              },
              'message': {
                'value': this.creds.message
              }
            }, this.$store.state.headers
          )
            .then(({data: response}) => {
              this.message.succes = 'Uw bericht is verstuurd'
              this.message.error = ''
            })
            .catch((error) => { this.message.error = error })
        })
      } else {
        this.$store.state.error_authenticated = 'Je moet aangemeld zijn om een bericht te kunnen versturen. Meld je aan.'
        this.$router.push({name: 'Login'})
      }
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