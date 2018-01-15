<template>
  <div id="details" class="tabview tabview—active">
          <p class="price">€ {{vehicle.field_prijs[0].value}}/dag</p>
          <hr>
            <h4>Technische eigenschappen</h4>
            <table class="tableDetail">
                <tr>
                  <td>Type</td>
                  <td>{{ vehicle.name[0].value}}</td>
                </tr>
                <tr>
                  <td>Jaar</td>
                  <td>{{ vehicle.field_inschrijvingsjaar[0].value}}</td>
                </tr>
                <tr>
                  <td>Kilometerteller</td>
                  <td>{{ vehicle.field_kilometerstand[0].value}}</td>
                </tr>
                <tr>
                  <td>Versnelling</td>
                  <td>{{ vehicle.field_versnellingsbak[0].value}}</td>
                </tr>
                <tr>
                  <td>Deuren</td>
                  <td>{{ vehicle.field_deuren[0].value}}</td>
                </tr>
                <tr>
                  <td>Zitplaatsen</td>
                  <td>{{ vehicle.field_zitplaatsen[0].value}}</td>
                </tr>
            </table>
          <hr>
            <h4>Opties en accessoires </h4>
              <ul v-for="option in options">
                <li>{{ option.name[0].value}}</li>
            </ul>
      </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'detailsTab',
  props: ['vehicle', 'options'],
  data () {
    return {
      // options: [],
      message: {
        error: '',
        succes: ''
      }
    }
  },
  created () {
    /* console.log(this.vehicle)
    for (var i = 0; i < this.vehicle.field_opties.length; i++) {
      // this.getOptions(this.vehicle.field_opties[i].url, i)
      this.$store.state.url.pathname = this.vehicle.field_opties[i].url
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => {
          this.options[i] = response
        })
        .catch(({message: error}) => { this.message.error += error })
    }
    console.log(this.options) */
  },
  methods: {
    /* getOptions: function (path, i) {
      this.$store.state.url.pathname = path
      axios.get(`${this.$store.state.url}?_format=json`)
        .then(({data: response}) => {
          this.options[i] = response
          console.log(this.options)
        })
        .catch(({message: error}) => { this.message.error += error })
    } */
  }
}
</script>