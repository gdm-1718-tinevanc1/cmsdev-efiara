<template>
    <div id="renter" class="tabview tabview—active">
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
</template>

<script>
export default {
  name: 'renterInfo',
  data () {
    return {}
  }
}
</script>