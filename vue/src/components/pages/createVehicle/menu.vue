<template>
    <div class="container">
      <div class="menu">
          <div class="col box">
            <router-link :to="{ name: 'Edit_Step1', params: { id: this.$route.params.id}}">Beschrijving</router-link>
          </div>
          <div class="col s6 box left">
              <router-link :to="{ name: 'Edit_Step2', params: { id: this.$route.params.id}}">Adres</router-link>
          </div>
          <div class="col s6 box right">
              <router-link :to="{ name: 'Edit_Step3', params: { id: this.$route.params.id}}">Voorwaarden</router-link>
          </div>
            <div class="col box">
              <router-link :to="{ name: 'Edit_Step4', params: { id: this.$route.params.id}}">Beschikbaarheid</router-link>
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
