<template>
    <div class="nav-side">

        <div class="nav">
            <a class="logo left" href="/">
            <img src="../assets/logo.png" alt="logo">
            </a>
            <div class="bars" v-if="!show" @click="show = !show"><i class="fa fa-bars right" aria-hidden="true"></i></div>
        </div>
        <div>
            <transition name="sidebar">
                <div v-if="show" id="sidebar">
                    <div class="close" @click="show = !show"><i class="fa fa-times" aria-hidden="true"></i></div>
                    <ul class="links">
                        <li><router-link :to="{ name: 'Profile'}">Mijn profiel</router-link></li>
                        <li><router-link to="/bookings">Geboekte auto's</router-link></li>
                        <li><router-link to="/vehicles/create"></i>Voertuig verhuren</router-link></li>
                         <hr>
                        <li><router-link to="/myvehicles"> Mijn voertuigen</router-link></li>
                        <li><router-link to="/requests"> Aanvragen</router-link></li>
                         <hr>
                        <li><router-link to="/chargingpoints"> Laadpunten</router-link></li>
                        <li><router-link to="/info"> Info</router-link></li>
                        <li><a @click="logout()">Uitloggen</a></li>
                    </ul>
                </div>
            </transition>
         </div>

    </div>
</template>
<script>

export default {
  data: function () {
    return {
      show: false
    }
  }
}
</script>
