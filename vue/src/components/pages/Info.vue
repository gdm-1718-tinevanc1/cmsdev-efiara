<template>
  <div class="container">
     <div class="info">
        <div class="tabs">
          <a @click="clickTab('renter')" id="renterButton" class="tabs__button tabs__button--active col s6">Als huurder</a>
          <a @click="clickTab('owner')" id="ownerButton" class="tabs__button col s6">Als verhuurder</a>
          <a @click="clickTab('conditions')" id="conditionsButton" class="tabs__button col s6">Voorwaarden</a>
        </div>

      <RenterInfo></RenterInfo>
      <OwnerInfo></OwnerInfo>
      <ConditionsInfo></ConditionsInfo>
    </div>
  </div>
</template>

<script>
import ConditionsInfo from '../info_tabs/conditionsInfo'
import OwnerInfo from '../info_tabs/ownerInfo'
import RenterInfo from '../info_tabs/renterInfo'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'info',
  components: {
    ConditionsInfo,
    OwnerInfo,
    RenterInfo
  },
  data () {
    return {
    }
  },
  methods: {
    clickTab: function (tab) {
      let tabs = document.getElementsByClassName('tabview')
      let buttons = document.getElementsByClassName('tabs__button')
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none'
        buttons[i].className = buttons[i].className.replace(/\btabs__button--active\b/g, '')
      }
      document.getElementById(tab).style.display = 'block'
      let selectedElement = event.target.id
      document.getElementById(selectedElement).className += ' tabs__button--active'
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