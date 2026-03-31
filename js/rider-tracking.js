import { supabase } from './supabase-client.js'

const PARTICIPANT_ID = localStorage.getItem('participant_id') || prompt("Tu número")
const EVENT_ID = "ruta-1"

localStorage.setItem('participant_id', PARTICIPANT_ID)

function sendPosition(lat, lng) {
  supabase.from('live_positions').upsert({
    participant_id: PARTICIPANT_ID,
    event_id: EVENT_ID,
    lat,
    lng,
    timestamp: new Date()
  })
}

setInterval(() => {
  navigator.geolocation.getCurrentPosition(pos => {
    sendPosition(pos.coords.latitude, pos.coords.longitude)
  })
}, 5000)
