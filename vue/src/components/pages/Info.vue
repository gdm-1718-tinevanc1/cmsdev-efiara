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
       <!-- <div id="renter" class="tabview tabview—active">
        <ol>
          <li> 
            <div class="bold">
              Zoek een voertuig.
            </div>
            Maak een <router-link to="/register"> account </router-link> aan. 
            Vul op de <router-link to="/"> homepagina </router-link> het adres en de begin- en einddatum van de gewenste huurperiode in en vind de auto die u nodig hebt.
          </li>
          <li> 
            <div class="bold">
              Boek een voertuig.
            </div>
            Selecteer een voertuig en verstuur u huuraanvraag. De aanvraag wordt nadien geaccepteerd of geweigerd door de verhuurder.
          </li>
          <li> 
            <div class="bold">
              Haal uw voertuig op.
            </div>
            Ontmoet de eigenaar om de huur te starten op de aangegeven plaats en tijd. Inspecteer samen het voertuig en teken de huurovereenkomst. Betaal hierbij het voorschot.
          </li>
          <li> 
            <div class="bold">
            Breng het voertuig terug aan het einde van de huur.
            </div>
            Aan het einde van de huur brengt u het voertuig terug en betaalt u de prijs. Teken hierbij nogmaals de huurovereenkomst.
          </li>
          <li> 
            <div class="bold">
              Laat een review achter.
            </div>
            Na het terugbrengen van het voertuig kan u een review achter laten voor het voertuig. Op die manier kunnen anderen geïnformeerd worden.
          </li>
          <li> 
          Bij klachten of opmerkingen kan er <router-link to="/contact"> een bericht </router-link> worden verstuurd naar het beheer.
          </li>
        </ol>
       </div>
       <div id="owner" class="tabview">
        <ol>
            <li> 
              <div class="bold">
                Schrijf uw voertuig in.
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
              Ontmoet de huurder op de aangegeven plaats en tijd. Overhandig de sleutels en teken de huurovereenkomst. U krijgt hierbij het voorschot.
            </li>
            <li> 
              <div class="bold">
                Haal uw voertuig terug op.
              </div>
              Aan het einde van de huur haalt u uw voertuig terug op en ontvangt u uw geld. Teken vervolgens nogmaals de huurovereenkomst.
            </li>
            <li> 
              Bij klachten of opmerkingen kan er <router-link to="/contact"> een bericht </router-link> worden verstuurd naar het beheer.
            </li>
        </ol>
       </div>
       <div id="conditions" class="tabview">
        <ul>
            <li> 
              <div class="bold">
                Voorwaarden
              </div>
                De huurprijs is per dag. De verhuurder kan hieraan een maximum aantal kilometers koppelen. Indien deze overschreden wordt,zal bij  de afrekening een supplement per bijkomende kilometer verrekend worden.
                De verhuurder stelt een aantal voorwaarden op, zoals bv. het aantal kilometers per dag. 
                Bij het niet respecteren van deze voorwaarden kunnen extra kosten aangerekend worden.
            </li>
            <li> 
              <div class="bold">
                Staat voertuig
              </div>
              Kosten voor het reinigen van het voertuig zijn niet inbegrepen. Het voertuig is steeds gereinigd (binnen en buiten) voor het afleveren. Indien het voertuig niet in dezelfde staat terug gebracht wordt, wordt 30 euro extra aangerekend.
            </li>
            <li>
              <div class="bold">
                Huurovereenkomst
              </div>
               De huurder verklaart bij geschreven overeenkomst te beschikken over een geldig rijbewijs,  en volledig in te staan voor alle verkeersovertredingen en de mogelijke gevolgen.
            </li>
            <li>
              <div class="bold">
                Bestuurder
              </div>
                Het voertuig wordt slechts bestuurd door de huurder zelf. Indien meerdere bestuurders gebruik maken van het voertuig wordt dit uitdrukkelijk vermeld, met hun identiteitsgegevens. Het voorgaande punt geldt voor elk van hen persoonlijk.            </li>
            <li>
              <div class="bold">
                Waarborg
              </div>
                Bij het afhalen van het voertuig, wordt een voorschot betaald, dat 75% van de vermoedelijke prijs bedraagt, als waarborg. Het afrekenen volgt op het einde van de huurperiode.
            </li>
            <li>
              <div class="bold">
                Opladen
              </div>
                De huurder krijgt steeds een volledig opgeladen voertuig mee. Bij het terug brengen van het voertuig dient deze terug volledig opgeladen aangeboden te worden. Mits een vooraf bepaalde vergoeding kan de verhuurder ook instaan voor het terug opladen.
            </li>      
        </ul>
       </div> -->
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