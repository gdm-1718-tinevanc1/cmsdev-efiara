<template>
  <div class="container">
     <div class="profile">
        <h4 class="title--page">Mijn profiel</h4>
         <form class="form--profile">

          <label for="naam">Naam</label><br>
          <input name="naam" id="naam" placeholder="Naam"><br>

          <label for="voornaam">Voornaam</label><br>
          <input name="voornaam" id="voornaam" placeholder="Voornaam"><br>

          <label for="geboortedatum">Geboortedatum</label><br>
          <input name="geboortedatum" id="geboortedatum" placeholder="Geboortedatum"><br>

          <label for="geboorteplaats">Geboorteplaats</label><br>
          <input name="geboorteplaats" id="geboorteplaats" placeholder="Geboorteplaats"><br>

          <h5>Rijbewijs</h5>
          <label for="rijbewijsnummer">Rijbewijsnummer</label><br>
          <input name="rijbewijsnummer" id="rijbewijsnummer" placeholder="Rijbewijsnummer"><br>

          <label for="uitgiftdatum">Uitgiftedatum</label><br>
          <input name="uitgiftdatum" id="uitgiftdatum" placeholder="Uitgiftedatum"><br>

          <label for="landuitgifte">Land van uitgifte</label><br>
          <input name="landuitgifte" id="landuitgifte" placeholder="Land van uitgifte"><br>

          <h5>Contact</h5>
          <label for="email">E-mail</label><br>
          <input name="email" id="email" placeholder="E-mail"><br>

          <label for="nummer">Nummer</label><br>
          <input name="nummer" id="nummer" placeholder="Nummer"><br>

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
  name: 'profile',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">


</style>