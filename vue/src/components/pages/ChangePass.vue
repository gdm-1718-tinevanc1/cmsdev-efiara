<template>
  <div class="container">
     <div class="changepass">
     <h4 class="title--page">Verander jouw wachtwoord</h4>
     <form class="form--profile">
        <label for="wachtwoord_oud">Jouw bestaand wachtwoord</label><br>
        <input type="password" name="wachtwoord_oud" id="passOld" placeholder="Bestaand wachtwoord" v-model="creds.pass[0].existing" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('wachtwoord_oud') }"><br>

        <label for="wachtwoord_nieuw">Jouw nieuw wachtwoord</label><br>
        <input type="password" name="wachtwoord_nieuw" id="passNew" placeholder="Nieuw wachtwoord" v-model="creds.pass[0].value" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('wachtwoord_nieuw') }"><br>

        <div class="btn--primary"><a @click="submit()">Aanpassen</a></div>

        <div class="message--error"> <br>
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span v-if="!errors.any()">
              {{message.error}}
            </span>
          </div>
          <div class="message--succes">{{message.succes}}</div>
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
  name: 'changePass',
  data () {
    return {
      creds: {
        'pass': [ {
          'existing': '',
          'value': ''
        } ]
      },
      profileId: localStorage.getItem('profileId'),
      message: {
        error: '',
        succes: ''
      }
    }
  },
  created () {
  },
  methods: {
    submit: function () {
      this.message.error = ''
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.checkAuth) {
            this.$store.state.url.pathname = `user/${localStorage.getItem('profileId')}`
            axios.patch(`${this.$store.state.url}?_format=hal_json`, this.creds, this.$store.state.headers)
              .then(response => {
                this.message.succes = 'Je wachtwoord is aangepast'
              })
              .catch(({message: error}) => {
                this.message.error = error
              })
          } else {
            this.message.error = 'Je kan dit wachtwoord niet aanpassen.'
          }
        }
      })
    }
  },
  computed: {
    checkAuth: function () {
      let profileId = parseInt(this.$route.params.id)
      let userId = parseInt(localStorage.getItem('profileId'))
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

body.background--image{
  margin: 0;
  background-image: url("../../assets/background.png");
  background-color: #000000;
  color: #ffffff
}

</style>