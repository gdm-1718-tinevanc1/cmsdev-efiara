<template>
    <div class="container">
      <div class="step1">
        <h4 class="title--page">Beschrijving</h4>
        <form class="form--create">

          <label for="merk">Merk</label><br>
          <input name="merk" id="merk" placeholder="Merk"><br>

          <label for="model">Model</label><br>
          <input name="model" id="model" placeholder="Model"><br>

          <label for="geboortedatum">Land van inschrijving</label><br>
          <input name="geboortedatum" id="geboortedatum" placeholder="Land van inschrijving"><br>

          <label for="inschrijvingsjaar">Jaar inschrijving</label><br>
          <input name="inschrijvingsjaar" id="inschrijvingsjaar" placeholder="Jaar inschrijving"><br>

          <h5>Kenmerken</h5>
          <label for="zitplaatsen">Aantal zitplaatsen</label><br>
          <input name="zitplaatsen" id="zitplaatsen" placeholder="Aantal zitplaatsen"><br>

          <label for="deuren">Aantal deuren</label><br>
          <input name="deuren" id="deuren" placeholder="Aantal deuren"><br>

          <label for="versnellingsbak">Versnellingsbak</label><br>
          <input name="versnellingsbak" id="versnellingsbak" placeholder="Versnellingsbak"><br>

          <label for="kilometers">Aantal totale kilometers</label><br>
          <input name="kilometers" id="kilometers" placeholder="Aantal totale kilometers"><br>

          <label for="verbruik">Verbruik</label><br>
          <input name="verbruik" id="verbruik" placeholder="Verbruik"><br>

           <div class="btn--primary"><a @click="submit()">Aanpassen</a></div>
        </form>
      </div>
    </div>
</template>


<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step1',
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
