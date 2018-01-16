<template>
  <div id="conditions" class="tabview">
            <table class="tableDetail">
                <tr>
                  <td>Maximale verhuurdagen</td>
                  <td>{{ vehicle.field_verhuurdagen[0].value}} dagen</td>
                </tr>
                <tr>
                  <td>Maximale kilometers per dag</td>
                  <td>{{ vehicle.field_kilometers_per_dag[0].value}} km/dag</td>
                </tr>
                <tr>
                  <td>Minimum leeftijd</td>
                  <td>{{ vehicle.field_min_leeftijd[0].value}} jaar</td>
                </tr>
            </table>
       </div>
</template>

<script>
export default {
  name: 'conditionsTab',
  props: ['vehicle'],
  data () {
    return {
    }
  }
}
</script>