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
  components: { Sidebar }
}
</script>

<style>

main {
  margin-top: -10px;
}

h5{
  text-align: center;
}

.nav-side {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #ffffff;
  color: #000000;
  border-bottom: solid 1px #f2f2f2;
  height:45px;
  
 /* background-color: #6CBFA5;*/
}

#sidebar .nav {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}


#sidebar {
  position: fixed;
  z-index: 999;
  background: #FFF;
  margin-top: 0px;
  height: 100vh;
  width: 65%;
  overflow-y: scroll;
  right: 0px;
  color: #000;
}

.left{
  float: left;
}

.right{
  float: right;
}

.close{
  padding: 10px 25px;
  font-size: 1.5rem;
  text-align: right;
}

.bars{
  padding: 10px;
  font-size: 1.5rem;
}

.logo img{
  width: 70px;
  margin-top: 10px;
}

</style>
