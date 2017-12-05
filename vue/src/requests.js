import axios from 'axios'

export default {

  message: {
    succes: '',
    error: ''
  },
  vehicle: {
    data: {
      name: [ { value: '' } ],
      field_model: [ { value: '' } ],
      vehicle_country: [ { value: '' } ],
      field_inschrijvingsjaar: [ { value: '' } ],
      field_zitplaatsen: [ { value: '' } ],
      field_deuren: [ { value: '' } ],
      field_versnellingsbak: [ { value: '' } ],
      field_kilometerstand: [ { value: '' } ],
      consumption: [ { value: '' } ],
      street: [ { value: '' } ],
      number: [ { value: '' } ],
      field_locatie: [ { value: '' } ],
      country: [ { value: '' } ],
      field_verhuurdagen: [ { value: '' } ],
      field_min_leeftijd: [ { value: '' } ],
      field_kilometers_per_dag: [ { value: '' } ],
      field_prijs: [ { value: '' } ]
    }
  },
  // get vehicle edit 4x
  getVehicleId (id) {
    window.shared.url.pathname = `efiara/vehicles/${id}`
    axios.get(`${window.shared.url}?_format=json`)
      .then(({data: response}) => { this.vehicle.data = response })
      .catch(({message: error}) => { this.message.error = error })
  },

  // get vehicle edit 4x
  patchVehicle (id, creds) {
    window.shared.url.pathname = `efiara/vehicles/${id}`
    axios.patch(`${window.shared.url}?_format=hal_json`, creds, window.shared.headers)
      .then(response => {
        this.message.succes = 'Je voertuig is aangepast'
      })
      .catch(error => {
        this.message.error = error
      })
  }
}
