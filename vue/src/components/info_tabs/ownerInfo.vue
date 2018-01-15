<template>
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
</template>

<script>
export default {
  name: 'ownerInfo',
  data () {
    return {}
  }
}
</script>