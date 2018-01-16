<template>
  <div id="map" class="tabview">
        <gmap-map
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 100%; height: 280px"
        >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
			      :optimized="false",
            :draggable="false"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
       </div>
      </div>
</template>

<script>
export default {
  name: 'mapTab',
  props: ['center', 'markers'],
  data () {
    return {
    }
  }
}
</script>