<template>
    <div class="container">
      <div class="step2">
        <h4 class="title--page">Adres</h4>
        <form class="form--create">

          <label for="straat">Straat</label><br>
          <input name="straat" id="straat" placeholder="Straat"><br>

          <label for="nummer">Nummer</label><br>
          <input name="nummer" id="nummer" placeholder="Nummer"><br>

          <label for="plaats">Plaats</label><br>
          <input name="paats" id="plaats" placeholder="Plaats"><br>

          <label for="Land">Land</label><br>
          <input name="Land" id="Land" placeholder="Land"><br>

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
  name: 'step2',
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
