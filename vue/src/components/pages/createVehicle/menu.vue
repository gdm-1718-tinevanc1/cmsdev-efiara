<template>
    <div class="container">
      <div class="menu">
          <div class="col box">
            <router-link to="/vehicles/create/step1">Beschrijving</router-link>
          </div>
          <div class="col s6 box left">
              <router-link to="/vehicles/create/step2">Adres</router-link>
          </div>
          <div class="col s6 box right">
              <router-link to="/vehicles/create/step3">Voorwaarden</router-link>
          </div>
            <div class="col box">
                <router-link to="/vehicles/create/step4">Beschikbaarheid</router-link>
              </div>
        </div>
    </div>
</template>


<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'menu',
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">

body.background--image{
  margin: 0;
  background-image: url("../../../assets/background.png");
  background-color: #000000;
  color: #ffffff
}

</style>
