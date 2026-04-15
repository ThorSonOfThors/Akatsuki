<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const events = ref([])

onMounted(async () => {
  const { data } = await supabase.from('events').select('*')
  events.value = data
})
</script>

<template>
  <l-map style="height: 500px" :zoom="10" :center="[-6.2, 106.8]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <l-marker
      v-for="event in events"
      :key="event.id"
      :lat-lng="[event.latitude, event.longitude]"
    >
      <l-popup>
        <strong>{{ event.name }}</strong><br />
        {{ event.location }}
      </l-popup>
    </l-marker>
  </l-map>
</template>