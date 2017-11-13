<template>
  <div class="container">
     <div class="book">
        <form class="form--book">
        {{uuid}}
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
import axios from 'axios'

export default {
  beforeCreate: function () {
    document.body.className = 'background--white'
  },
  name: 'book',
  data () {
    return {
      uuid: localStorage.getItem('Book_vehicle'),
      message: {
        error: '',
        succes: ''
      },
      headers: {
        'header': {
          'Authorization': 'Basic ZWZpYXJhLXVzZXI6ZWZpYXJhLXBhc3M=',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/hal+json',
          'Accept': 'application/hal+json'
        }
      }
    }
  },
  methods: {
    submit: function () {
      axios.post(`http://cmsdev.localhost/entity/bookings?_format=hal_json`, {
        /* 'name': {
          'value': '2017-11-03T22:00:00'
        },
        'field_eind_datum': {
          'value': '2017-11-03T22:00:00'
        },
        '_embedded': {
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_huurder': [
            {
              'uuid': [
                {
                  'value': 'b7a38a5e-c813-41f4-a8ad-5a811a73ebd6'
                }
              ]
            }
          ],
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_voertuig': [
            {
              'uuid': [
                {
                  'value': '7f1b4236-e84e-472b-8f56-65a80cf3e540'
                }
              ]
            }
          ]
        } */
        '_links': {
          'self': {
            'href': 'http://cmsdev.localhost/efiara/bookings/5?_format=hal_json'
          },
          'type': {
            'href': 'http://cmsdev.localhost/rest/type/bookings/bookings'
          },
          'http://cmsdev.localhost/rest/relation/bookings/bookings/user_id': [
            {
              'href': 'http://cmsdev.localhost/user/1?_format=hal_json',
              'lang': 'nl'
            }
          ],
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_huurder': [
            {
              'href': 'http://cmsdev.localhost/efiara/renter/2?_format=hal_json'
            }
          ],
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_voertuig': [
            {
              'href': 'http://cmsdev.localhost/efiara/vehicles/4?_format=hal_json'
            }
          ]
        },
        'langcode': [
          {
            'value': 'nl'
          }
        ],
        '_embedded': {
          'http://cmsdev.localhost/rest/relation/bookings/bookings/user_id': [
            {
              '_links': {
                'self': {
                  'href': 'http://cmsdev.localhost/user/1?_format=hal_json'
                },
                'type': {
                  'href': 'http://cmsdev.localhost/rest/type/user/user'
                }
              },
              'uuid': [
                {
                  'value': 'fcbf956d-7918-46cf-a441-1871e15a6712'
                }
              ],
              'lang': 'nl'
            }
          ],
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_huurder': [
            {
              '_links': {
                'self': {
                  'href': 'http://cmsdev.localhost/efiara/renter/2?_format=hal_json'
                },
                'type': {
                  'href': 'http://cmsdev.localhost/rest/type/renter/renter'
                }
              },
              'uuid': [
                {
                  'value': 'b7a38a5e-c813-41f4-a8ad-5a811a73ebd6'
                }
              ]
            }
          ],
          'http://cmsdev.localhost/rest/relation/bookings/bookings/field_voertuig': [
            {
              '_links': {
                'self': {
                  'href': 'http://cmsdev.localhost/efiara/vehicles/4?_format=hal_json'
                },
                'type': {
                  'href': 'http://cmsdev.localhost/rest/type/vehicles/vehicles'
                }
              },
              'uuid': [
                {
                  'value': '7f1b4236-e84e-472b-8f56-65a80cf3e540'
                }
              ]
            }
          ]
        },
        'name': [
          {
            'value': '2017-11-03T22:00:00'
          }
        ],
        'status': [
          {
            'value': true
          }
        ],
        'created': [
          {
            'value': '2017-11-11T12:46:29+00:00',
            'format': 'Y-m-d\\TH:i:sP'
          }
        ],
        'changed': [
          {
            'value': '2017-11-11T12:46:29+00:00',
            'format': 'Y-m-d\\TH:i:sP'
          }
        ],
        'field_eind_datum': [
          {
            'value': '2017-11-03T22:00:00'
          }
        ],
        'field_status': [
          {
            'value': 'In afwachting'
          }
        ]
      },
      this.headers)
        .then(response => { this.message.succes = 'Succevol geboekt' })
        .catch(error => { this.message.error = error.response.data })
    }
  }
}
</script>

<style lang="scss">
</style>