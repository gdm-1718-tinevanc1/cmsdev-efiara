<template>
  <div class="container">
     <div class="home">
        <img class="logo--big" src="../assets/logo.png">
        <form class="form--home">
          <label id="label--place">
            <input name="plaats" type="text" id="place" placeholder="Plaats" v-validate="'required'" v-model="filter.place" :class="{'input': true, 'is-danger': errors.has('plaats') }" >
          </label><br>

          <label id="label--begindate">
            <input name="begindatum" id="begindate" type="date" placeholder="Begin datum" v-validate="'required'" v-model="filter.startdate" :class="{'input': true, 'is-danger': errors.has('begindatum') }">
          </label><br>

          <label id="label--enddate">
            <input name="einddatum"id="enddate" type="date" placeholder="Eind datum" v-validate="'required'" v-model="filter.enddate" :class="{'input': true, 'is-danger': errors.has('einddatum') }">
          </label><br>

          <div class="message--error">
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
          </div>

          <div class="btn--login"><router-link :to="{ name: 'Overview', params: { place: filter.place, startdate: filter.startdate, enddate: filter.enddate}}" exact><a>Zoeken</a> </router-link></div>
        </form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import messages from 'vee-validate/dist/locale/nl'

Validator.addLocale(messages)
const config = {
  locale: 'nl'
}
// Vue.install(VueGeolocation)
Vue.config.productionTip = false
Vue.use(VeeValidate, config)

export default {
  beforeCreate: function () {
    document.body.className = 'background--image'
  },
  name: 'home',
  data: function () {
    return {
      filter: {
        place: '',
        startdate: '',
        enddate: ''
      }
    }
  },
  methods: {
    redirectTo: function () {
      this.$validator.validateAll().then((result) => {
        this.$router.push({name: 'Overview', params: {place: this.filter.place, startdate: this.filter.startdate, enddate: this.filter.enddate}})
      })
    }
  }
}
</script>


<style lang="scss">

body.background--image{
  margin: 0;
  background-image: url("../assets/background.png");
  background-color: #000000;
  color: #ffffff
}

</style>