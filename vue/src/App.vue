<template>
  <div id="app">
  <Sidebar></Sidebar>
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">-->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: { Sidebar }
}
</script>

<style>

</style>
