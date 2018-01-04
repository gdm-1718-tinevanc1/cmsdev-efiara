import axios from 'axios'
import { store } from '../src/main.js'

export default {

  message: {
    succes: '',
    error: ''
  },
  vehicle: {
    data: {
      name: [ { value: '' } ],
      field_model: [ { value: '' } ],
      field_inschrijvingsjaar: [ { value: '' } ],
      field_zitplaatsen: [ { value: '' } ],
      field_deuren: [ { value: '' } ],
      field_versnellingsbak: [ { value: '' } ],
      field_kilometerstand: [ { value: '' } ],
      field_straat: [ { value: '' } ],
      field_huisnummer: [ { value: '' } ],
      field_locatie: [ { value: '' } ],
      field_land: [ { value: '' } ],
      field_verhuurdagen: [ { value: '' } ],
      field_min_leeftijd: [ { value: '' } ],
      field_kilometers_per_dag: [ { value: '' } ],
      field_prijs: [ { value: '' } ],
      field_eigenaar: [ { target_id: '' } ],
      field_afbeelding: [ { target_id: '' } ],
      field_niet_beschikbaar: [ { value: '' } ],
      field_opties: []
    }
  },
  // get vehicle edit 4x
  getVehicleId (id) {
    store.state.url.pathname = `efiara/vehicles/${id}`
    axios.get(`${store.state.url}?_format=json`)
      .then(({data: response}) => { store.state.create_vehicle.data = response })
      .catch(({message: error}) => { this.message.error = error.response.data })
  },

  // get vehicle edit 4x
  patchVehicle (id, creds) {
    store.state.url.pathname = `efiara/vehicles/${id}`
    axios.patch(`${store.state.url}?_format=hal_json`, creds, store.state.headers)
      .then(response => {
        this.message.succes = 'Je voertuig is aangepast'
        this.message.error = ''
      })
      .catch(error => {
        this.message.error = error.response.data
      })
  }
}
