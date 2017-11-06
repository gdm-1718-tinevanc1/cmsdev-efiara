<template>
    <div class="container">
      <div class="step4">
        <h4 class="title--page">Beschikbaarheid</h4>
          <form class="form--create">
            <h5>Prijs</h5>
            <label for="prijs">Prijs per kilometer</label><br>
            <input name="prijs" id="prijs" placeholder="Prijs per kilometer"><br>

            <h5>Kalander</h5>
            <full-calendar :events="events"></full-calendar>

            <div class="btn--primary"><a @click="submit()">Aanpassen</a></div>
          </form>
      </div>
    </div>
</template>


<script>
import Vue from 'vue'
import FullCalendar from 'vue-full-calendar'
window.jQuery = window.$ = require('jquery')

Vue.use(FullCalendar)

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'step4',
  data: function () {
    return {
      events: [
        {
          title: 'event1',
          start: '2017-11-01',
          allDay: true,
          color: 'yellow',
          textColor: 'red'
        },
        {
          title: 'event2',
          start: '2017-11-05',
          end: '2017-11-10'
        },
        {
          title: 'event3',
          start: '2017-11-12',
          allDay: false
        }
      ]
    }
  },
  methods: {
    refreshEvents () {
      this.$refs.calendar.$emit('render-event(event)')
    }
  }
}
</script>

<style lang="scss">

</style>
