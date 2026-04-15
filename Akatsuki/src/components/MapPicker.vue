<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const emit = defineEmits(['update:coords'])

const center = ref([-6.2, 106.8]) // Jakarta default
const marker = ref(null)

const setMarker = (e) => {
  const { lat, lng } = e.latlng
  marker.value = [lat, lng]

  emit('update:coords', { lat, lng })
}
</script>

<template>
  <l-map
    style="height: 300px"
    :zoom="13"
    :center="center"
    @click="setMarker"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <l-marker v-if="marker" :lat-lng="marker" />
  </l-map>
</template>