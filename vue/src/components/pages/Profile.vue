<template>
  <div class="container">
     <div class="profile">
        <h4 class="title--page">{{user.name[0].value}}</h4>
        <table class="tableDetail">
          <tr>
            <td>Naam</td>
            <td>{{user.field_voornaam[0].value}} {{user.field_naam[0].value}}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td> <span v-if="user.mail">{{user.mail[0].value}}</span></td>
          </tr>
          <tr>
            <td>Geboortedatum</td>
            <td>{{user.field_geboortedatum[0].value}}</td>
          </tr>
          <tr>
            <td>Uitgiftdatum rijbewijs</td>
            <td> <span v-if="user.field_uitgiftedatum[0]">{{user.field_uitgiftedatum[0].value}}</span></td>
          </tr>
          </tr>
        </table>
    </div>
  </div>
</template>

<script>
// import Auth from '../../auth.js'
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'profile',
  data () {
    return {
      user: {},
      message: {
        error: '',
        succes: ''
      },
      profileId: localStorage.getItem('profileId')
    }
  },
  created () {
    this.$store.state.url.pathname = `user/${this.$route.params.id}`
    axios.get(`${this.$store.state.url}?_format=json`, this.$store.state.headers)
      .then(({data: response}) => { this.user = response })
      .catch(({message: error}) => { this.message.error = error })
  },
  computed: {
    checkAuth: function () {
      let profileId = this.$route.params.id
      let userId = localStorage.getItem('profileId')
      if (profileId === userId) {
        this.$router.push({name: 'ProfileEdit'})
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