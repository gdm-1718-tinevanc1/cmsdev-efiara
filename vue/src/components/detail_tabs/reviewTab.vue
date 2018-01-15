<template>
    <div id="review" class="tabview">
        <div class="review--total">Totaal: <star-rating class="right" :rating="reviewTotal" :star-size="20" :read-only="true" :show-rating="false"></star-rating></div>
        <hr>
        <div class="review--title">Reviews: </div>
        <div class="review" v-for="review in reviews">
          <star-rating class="right" :rating="review.field_score[0].value" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
          <div class="bold">{{review.name[0].value}}</div>
          {{review.field_commentaar[0].value}}
        </div>
        
        <form v-if="!checkAuthVehicle" class="form--review" on:submit.prevent="submitReview" data-vv-scope="review">
          <hr>
          <p>Geef jouw mening:</p>
          <star-rating name="rating" @rating-selected="validateRating" v-model="reviewCredentials.score" :star-size="20" :show-rating="false"></star-rating>
          <label for="titel">Titel</label><br>
          <input name="titel" id="titel" placeholder="titel" v-validate="'required'" v-model="reviewCredentials.title"><br>

          <label for="commentaar">Commentaar</label><br>
          <textarea name="commentaar" id="commentaar" placeholder="commentaar"  rows="4" cols="50" v-validate="'required'" v-model="reviewCredentials.comment"></textarea>

        <div class="message--succes">{{message.succes}}</div>
          <div class="message--error">
            <span>
              {{message.error}}
            </span>
            <ul v-for="error in errors.all()">
                <li>{{error}}</li>
              </ul>
          </div>
          <div class="btn--primary"><a v-validate="'required'" @click="submitReview">Mening delen</a></div>
        </form>
       </div>
</template>

<script>
import axios from 'axios'
import Auth from '../../auth.js'

export default {
  name: 'reviewTab',
  props: ['reviews', 'reviewTotal', 'checkAuthVehicle', 'getReviews'],
  data () {
    return {
      message: {
        error: '',
        succes: ''
      },
      reviewCredentials: {
        title: '',
        comment: '',
        score: null
      },
      id: this.$route.params.id
    }
  },
  methods: {
    validateRating: function () {
      this.message.error = ''
    },
    submitReview: function () {
      if (Auth.user.authenticated) {
        // this.$validator.validateAll('review')
        this.$validator.validateAll('review').then((result) => {
          if (this.reviewCredentials.score) {
            this.$store.state.url.pathname = '/entity/review'
            console.log(this.$store.state.headers)
            axios.post(`${this.$store.state.url}?_format=hal_json`,
              {
                'name': {
                  'value': this.reviewCredentials.title
                },
                'field_commentaar': {
                  'value': this.reviewCredentials.comment
                },
                'field_score': {
                  'value': this.reviewCredentials.score
                },
                'field_voertuig': {
                  'target_id': this.id
                }
              }, this.$store.state.headers
            )
              .then(({data: response}) => {
                this.message.succes = 'Je mening is toegevoegd'
                // this.getReviews()
              })
              .catch(({message: error}) => { this.message.error = error })
          } else {
            this.message.error = 'score is verplicht'
          }
        })
      } else {
        this.$store.state.error_authenticated = 'Je moet aangemeld zijn om een review te kunnen toevoegen. Meld je aan.'
        this.$router.push({name: 'Login'})
      }
    }
  }
}
</script>