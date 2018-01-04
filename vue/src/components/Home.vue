<template>
  <div class="container">
     <div class="home">
        <img class="logo--big" src="../assets/logo.png">
        <form class="form--home">
          <label id="label--place">
            <input name="plaats" type="text" id="place" placeholder="Plaats" v-validate="'required'" v-model="filter.place" :class="{'input': true, 'is-danger': errors.has('plaats') }" >
          </label><br>

          <label id="label--begindate">
          <datepicker v-on:input="validateRating" v-validate="'required'" v-model="filter.startdate" :disabled="state.disabled" language="nl" type="date" name="begindatum" id="begindate" placeholder="Begin datum" :class="{'input': true, 'is-danger': errors.has('begindatum') }"></datepicker>
          </label>

          <label id="label--enddate">
          <datepicker v-on:input="validateRating" v-validate="'required'" v-model="filter.enddate" :disabled="state.disabled" language="nl" type="date" name="einddatum" id="enddate" placeholder="Eind datum" :class="{'input': true, 'is-danger': errors.has('begindatum') }"></datepicker>
          </label>

          <div class="message--error">
            <ul v-for="error in errors.all()">
              <li>{{error}}</li>
            </ul>
            <span>
              {{message.error}}
            </span>
          </div>

          <div class="btn--login"><a @click="search()">Zoeken</a></div>
        </form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import Datepicker from 'vuejs-datepicker'
import messages from 'vee-validate/dist/locale/nl'
import * as moment from 'moment'
Vue.use(require('vue-moment'))

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
  components: {
    Datepicker
  },
  data: function () {
    return {
      filter: {
        place: '',
        startdate: '',
        enddate: ''
      },
      message: {
        error: ''
      },
      state: {
        date: {},
        disabled: {
          to: new Date()
        }
      }
    }
  },
  methods: {
    search: function () {
      this.$validator.validateAll().then((result) => {
        if (this.filter.startdate && this.filter.enddate) {
          let startdate = moment(this.filter.startdate).format('YYYY-MM-DD')
          let enddate = moment(this.filter.enddate).format('YYYY-MM-DD')
          this.$router.push({name: 'Overview', params: {place: this.filter.place, startdate: startdate, enddate: enddate}})
        } else {
          this.message.error = 'beide datums zijn verplicht'
        }
      })
    },
    validateRating: function () {
      if (this.filter.startdate && this.filter.enddate) {
        this.message.error = ''
      }
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