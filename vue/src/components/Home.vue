<template>
  <div class="container">
     <div class="home">
        <img class="logo--big" src="../assets/logo.png">
        <form class="form--home">
          <label id="label--place">
            <input type="text" id="place" placeholder="Plaats">
          </label><br>

          <label id="label--begindate">
            <input id="begindate" placeholder="Begin datum">
          </label><br>

          <label id="label--enddate">
            <input id="enddate" placeholder="Eind datum">
          </label><br>

          <div class="btn--login"><router-link to="/overview" exact><a>Zoeken</a> </router-link></div>
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