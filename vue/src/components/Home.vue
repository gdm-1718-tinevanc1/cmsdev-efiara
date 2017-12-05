<template>
  <div class="container">
     <div class="home">
        <img class="logo--big" src="../assets/logo.png">
        <form class="form--home">
          <label id="label--place">
            <input type="text" id="place" placeholder="Plaats" v-model="filter.place">
          </label><br>

          <label id="label--begindate">
            <input id="begindate" placeholder="Begin datum" v-model="filter.begindate">
          </label><br>

          <label id="label--enddate">
            <input id="enddate" placeholder="Eind datum" v-model="filter.enddate">
          </label><br>


          <div class="btn--login"><router-link :to="{ name: 'Overview', params: { place: filter.place}}" exact><a>Zoeken</a> </router-link></div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'home',
  data: function () {
    return {
      filter: {
        place: '',
        begindate: '',
        enddate: ''
      }
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