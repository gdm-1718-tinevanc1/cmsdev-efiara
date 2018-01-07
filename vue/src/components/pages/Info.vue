<template>
  <div class="container">
     <div class="info">
        <div class="tabs">
          <a @click="clickTab('renter')" id="renterButton" class="tabs__button tabs__button--active col s6">Als huurder</a>
          <a @click="clickTab('owner')" id="ownerButton" class="tabs__button col s6">Als verhuurder</a>
        </div>
       <div id="renter" class="tabview tabview—active">
        <ol>
          <li> 
            <div class="bold">
              Zoek een auto.
            </div>
            Maak een <router-link to="/register"> account </router-link> aan. 
            Vul op de <router-link to="/"> homepagina </router-link> het adres en de begin- en einddatum van de gewenste huurperiode in en vind de auto die u nodig hebt.
          </li>
          <li> 
            <div class="bold">
              Boek een auto.
            </div>
            Selecteer een auto en verstuur u huuraanvraag. De aanvraag wordt nadien geaccepteerd of geweigerd door de verhuurder.
          </li>
          <li> 
            <div class="bold">
              Haal u auto op.
            </div>
            Ontmoet de eigenaar om de huur te starten op de aangegeven plaats en tijd. Inspecteer samen het voertuig en teken de huurovereenkomst.
          </li>
          <li> 
            <div class="bold">
              Breng de auto terug aan het einde van de huur.
            </div>
            Aan het einde van de huur brengt u de auto terug en betaalt u de prijs. Teken hierbij nogmaals de huurovereenkomst.
          </li>
          <li> 
            <div class="bold">
              Laat een review achter.
            </div>
            Na het terugbrengen van de auto kan u een review achter laten voor het voertuig. Op die manier kunnen anderen geïnformeerd worden.
          </li>
          <li> 
          Bij klachten of opmerkingen kan er <router-link to=""> een bericht </router-link> worden verstuurd naar het beheer.
          </li>
        </ol>
       </div>
       <div id="owner" class="tabview">
        <ol>
            <li> 
              <div class="bold">
                Schrijf uw auto in.
              </div>
                <router-link to="/register">Schrijf u gratis in</router-link> en <router-link to="/vehicles/create/step1">voeg uw voertuig toe</router-link> aan de site. (beschrijving, prijs, foto’s, beschikbaarheidskalender,..)
            </li>
            <li> 
              <div class="bold">
                Ontvang huuraanvragen.
              </div>
                U ontvangt de <router-link to="/requests">huuraanvragen</router-link> en kan deze accepteren of weigeren.
            </li>
            <li> 
              <div class="bold">
                Ontmoet de huurder.
              </div>
              Ontmoet de huurder op de aangegeven plaats en tijd. Overhandig de sleutels en teken de huurovereenkomst.
            </li>
            <li> 
              <div class="bold">
                Haal uw voertuig terug op.
              </div>
              Aan het einde van de huur haalt u uw voertuig terug op en ontvangt u uw geld. Teken vervolgens nogmaals de huurovereenkomst.
            </li>
            <li> 
              Bij klachten of opmerkingen kan er <router-link to=""> een bericht </router-link> worden verstuurd naar het beheer.
            </li>
        </ol>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'info',
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


</style>