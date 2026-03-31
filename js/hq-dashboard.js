import { supabase } from './supabase-client.js'

const markers = {}

function createMarker(data) {
  const el = document.createElement('div')
  el.className = 'rider-marker'
  el.innerText = data.participant_id

  return new maplibregl.Marker(el)
    .setLngLat([data.lng, data.lat])
    .addTo(map)
}

function updateMarker(data) {
  const id = data.participant_id

  if (!markers[id]) {
    markers[id] = createMarker(data)
  } else {
    markers[id].setLngLat([data.lng, data.lat])
  }
}

supabase
  .channel('live_positions')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'live_positions'
  }, payload => {
    updateMarker(payload.new)
  })
  .subscribe()
