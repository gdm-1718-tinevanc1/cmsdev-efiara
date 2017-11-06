<template>
  <div class="container">
     <div class="book">
        <form class="form--book">
          <p class="bookVehicle">Voertuig</p>
          <label for="begindate">Begin datum</label><br>
          <input name="begindate" id="begindate" placeholder="Begin datum"><br>
          <label for="enddate">Eind datum</label><br>
          <input name="enddate" id="enddate" placeholder="Eind datum"><br>
           <div class="btn--primary"><a @click="submit()">Huur dit voertuig nu!</a></div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'book',
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      /* axios.post(`${window.shared.api}/votes_project`, {
                        candidature_id: this.candidature_id,
                        project_id: this.project.id,
                        password: this.password
                    }).then(response => {
                        this.message = 'Succesvol gestemd!'
                        this.code = response.data
                        this.codemessage = " Controleer jou stem via de code: " + this.code.uuid })
                    .catch(error => {
                            this.message = error.response.data
                    }); */
    }
  }
}
</script>

<style lang="scss">
</style>