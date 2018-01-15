<template>
    <div class="nav-side">

        <div class="nav">
            <router-link class="logo left" to="/">
            <img src="../assets/logo.png" alt="logo">
            </router-link>
            <div class="bars" v-if="!show" @click="show = !show"><i class="fa fa-bars right" aria-hidden="true"></i></div>
        </div>
        <div>
            <transition name="sidebar">
                <div v-if="show" id="sidebar">
                    <div class="close" @click="show = !show"><i class="fa fa-times" aria-hidden="true"></i></div>
                    <ul class="links" v-if="user.authenticated">
                        <li><router-link :to="{ name: 'ProfileEdit', params: { id: user.user.uid[0].value}}">Mijn profiel</router-link></li>
                        <li><router-link to="/bookings">Geboekte voertuigen</router-link></li>
                        <li><router-link to="/vehicles/create/step1"></i>Voertuig verhuren</router-link></li>
                         <hr>
                        <li><router-link to="/myvehicles"> Mijn voertuigen</router-link></li>
                        <li><span v-if="notification.notification" class="notification"><i class="fa fa-bell" aria-hidden="true"></i>{{notification.notification}}</span><router-link to="/requests"> Aanvragen</router-link></li>
                         <hr>
                        <li><router-link to="/chargingpoints"> Laadpunten</router-link></li>
                        <li><router-link to="/contact"> Contact</router-link></li>
                        <li><router-link to="/info"> Info</router-link></li>
                        <li><a @click="logout()">Uitloggen</a></li>
                    </ul>
                    <ul class="links" v-else>
                        <li><router-link to="/chargingpoints"> Laadpunten</router-link></li>
                        <li><router-link to="/info"> Info</router-link></li>
                        <li><router-link to="/login"> Inloggen</router-link></li>
                    </ul>
                </div>
            </transition>
         </div>

    </div>
</template>
<script>
import Auth from '../auth.js'

export default {
  data: function () {
    return {
      show: false,
      user: Auth.user,
      notification: this.$store.state,
      profile_id: Auth.user
    }
  },
  methods: {
    logout: function () {
      Auth.logout()
    }
  },
  watch: {
    notification (newParams) {
      this.notification = newParams
    }
  }
}
</script>
<style lang="scss">

body.background--image{
  margin: 0;
  background-image: url("../assets/background.png");
  background-color: #000000;
  color: #ffffff
}

</style>