<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../stores/auth'
import MapPicker from '../components/MapPicker.vue'

const auth = useAuthStore()

const events = ref([])
const loading = ref(false)
const previewImage = ref(null)
const showMapPicker = ref(false)

const form = ref({
  id: null,
  name: '',
  description: '',
  location: '',
  latitude: null,
  longitude: null,
  meeting_datetime: '',
  image: null,
  image_path: ''
})

const isEditing = ref(false)

// 🔐 AUTH GUARD
const requireAuth = () => {
  if (!auth.user) {
    alert('You must be logged in as admin')
    return false
  }
  return true
}

// 📥 LOAD EVENTS
const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) events.value = data
}

// 📤 UPLOAD IMAGE
const uploadImage = async (file) => {
  if (!requireAuth()) return null

  const fileName = `events/${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('event-images')
    .upload(fileName, file)

  if (error) {
    console.error("UPLOAD ERROR:", error)
    alert("Upload failed: " + error.message)
    return null
  }

  return data.path
}

// 🖼 IMAGE SELECT
const onImageSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return

  form.value.image = file

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// 🗺 MAP
const updateCoordinates = (coords) => {
  form.value.latitude = coords.lat
  form.value.longitude = coords.lng
  showMapPicker.value = false
}

const openMapPicker = () => {
  if (!requireAuth()) return
  showMapPicker.value = true
}

const clearCoordinates = () => {
  form.value.latitude = null
  form.value.longitude = null
}

// ➕ CREATE
const createEvent = async () => {
  if (!requireAuth()) return

  loading.value = true

  if (!form.value.name || !form.value.latitude || !form.value.longitude) {
    alert("Fill all required fields + pick location")
    loading.value = false
    return
  }

  let imagePath = null

  if (form.value.image) {
    imagePath = await uploadImage(form.value.image)
    if (!imagePath) {
      loading.value = false
      return
    }
  }

  const formattedDateTime = form.value.meeting_datetime
    ? new Date(form.value.meeting_datetime).toISOString()
    : null

  const { error } = await supabase.from('events').insert({
    name: form.value.name,
    description: form.value.description,
    location: form.value.location,
    meeting_datetime: formattedDateTime,
    image_path: imagePath,
    latitude: parseFloat(form.value.latitude),
    longitude: parseFloat(form.value.longitude)
  })

  if (error) {
    console.error(error)
    alert(error.message)
  } else {
    resetForm()
    await fetchEvents()
  }

  loading.value = false
}

// ✏️ UPDATE
const updateEvent = async () => {
  if (!requireAuth()) return

  loading.value = true

  let imagePath = form.value.image_path

  if (form.value.image) {
    imagePath = await uploadImage(form.value.image)
    if (!imagePath) {
      loading.value = false
      return
    }
  }

  const formattedDateTime = form.value.meeting_datetime
    ? new Date(form.value.meeting_datetime).toISOString()
    : null

  const { error } = await supabase
    .from('events')
    .update({
      name: form.value.name,
      description: form.value.description,
      location: form.value.location,
      meeting_datetime: formattedDateTime,
      image_path: imagePath,
      latitude: parseFloat(form.value.latitude),
      longitude: parseFloat(form.value.longitude)
    })
    .eq('id', form.value.id)

  if (error) {
    alert(error.message)
  } else {
    resetForm()
    await fetchEvents()
  }

  loading.value = false
}

// 🗑 DELETE
const deleteEvent = async (id) => {
  if (!requireAuth()) return

  if (!confirm('Delete event?')) return

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) {
    alert(error.message)
  } else {
    await fetchEvents()
  }
}

// 🧠 EDIT
const editEvent = (event) => {
  if (!requireAuth()) return

  form.value = {
    id: event.id,
    name: event.name,
    description: event.description || '',
    location: event.location || '',
    meeting_datetime: event.meeting_datetime
      ? event.meeting_datetime.slice(0, 16)
      : '',
    image: null,
    image_path: event.image_path,
    latitude: event.latitude,
    longitude: event.longitude
  }

  previewImage.value = getImageUrl(event.image_path)
  isEditing.value = true
}

// 🔄 RESET
const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    description: '',
    location: '',
    meeting_datetime: '',
    image: null,
    image_path: '',
    latitude: null,
    longitude: null
  }

  previewImage.value = null
  isEditing.value = false
  showMapPicker.value = false
}

// 🖼 IMAGE URL
const getImageUrl = (path) => {
  if (!path) return null
  const { data } = supabase.storage
    .from('event-images')
    .getPublicUrl(path)

  return data.publicUrl
}

// 📅 FORMAT DATE
const formatDate = (dateString) => {
  if (!dateString) return 'TBD'
  return new Date(dateString).toLocaleString()
}

// 📍 MAP LINK
const getGoogleMapsLink = (lat, lng) => {
  if (!lat || !lng) return '#'
  return `https://www.google.com/maps?q=${lat},${lng}`
}

// 🔥 INIT
onMounted(async () => {
  await auth.fetchUser() // 🔥 important
  fetchEvents()
})
</script>

<template>
  <div class="page">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="title">
          <span class="title-icon">⚡</span>
          EVENT MASTER
          <span class="title-icon">🎯</span>
        </h1>
        <p class="subtitle">Create, manage, and conquer your events like a true GigaChad</p>
      </div>
    </div>

    <!-- FORM SECTION -->
    <div class="form-container">
      <div class="form-card">
        <div class="form-header">
          <span class="form-icon">{{ isEditing ? '✏️' : '🚀' }}</span>
          <h2>{{ isEditing ? 'Edit Event' : 'Create New Event' }}</h2>
        </div>

        <div class="form-group">
          <label>EVENT NAME *</label>
          <input 
            v-model="form.name" 
            placeholder="Enter epic event name..."
            class="input-field"
            required
          />
        </div>

        <div class="form-group">
          <label>DESCRIPTION</label>
          <textarea 
            v-model="form.description" 
            placeholder="Describe your legendary event..."
            class="textarea-field"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>VENUE NAME / ADDRESS</label>
          <input 
            v-model="form.location" 
            placeholder="Venue name or address..."
            class="input-field"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>DATE & TIME</label>
            <input 
              type="datetime-local" 
              v-model="form.meeting_datetime"
              class="input-field"
            />
          </div>
        </div>

        <!-- LOCATION PICKER SECTION -->
        <div class="form-group">
          <label>EVENT LOCATION ON MAP *</label>
          <div class="location-picker-area">
            <div v-if="form.latitude && form.longitude" class="coordinates-display">
              <div class="coord-badge">
                <span class="coord-icon">📍</span>
                <span class="coord-text">
                  Lat: {{ form.latitude.toFixed(6) }}, Lng: {{ form.longitude.toFixed(6) }}
                </span>
                <button @click="clearCoordinates" class="clear-coords" title="Clear coordinates">✖</button>
              </div>
              <a :href="getGoogleMapsLink(form.latitude, form.longitude)" target="_blank" class="maps-link">
                Open in Google Maps →
              </a>
            </div>
            <button v-else @click="openMapPicker" class="btn-pick-location">
              <span class="btn-icon">🗺️</span>
              Pick Location on Map
            </button>
            <p v-if="!form.latitude || !form.longitude" class="location-hint">
              * Required: Click to select the exact event location
            </p>
          </div>
        </div>

        <!-- MAP PICKER MODAL -->
        <div v-if="showMapPicker" class="modal-overlay" @click.self="showMapPicker = false">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Select Event Location</h3>
              <button @click="showMapPicker = false" class="modal-close">✖</button>
            </div>
            <MapPicker @update:coords="updateCoordinates" />
            <p class="modal-hint">Click anywhere on the map to set the event location</p>
          </div>
        </div>

        <div class="form-group">
          <label>EVENT IMAGE</label>
          <div class="image-upload-area" @click="$refs.fileInput.click()">
            <input 
              ref="fileInput"
              type="file" 
              @change="onImageSelect" 
              accept="image/*"
              style="display: none"
            />
            <div v-if="previewImage" class="image-preview">
              <img :src="previewImage" alt="Preview" />
              <button class="remove-image" @click.stop="previewImage = null; form.image = null">✖</button>
            </div>
            <div v-else class="upload-placeholder">
              <span class="upload-icon">📸</span>
              <p>Click to upload an image</p>
              <small>PNG, JPG, GIF up to 10MB</small>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading-indicator">
          <div class="spinner"></div>
          <span>Processing...</span>
        </div>

        <div class="form-actions">
          <button v-if="!isEditing" @click="createEvent" class="btn btn-primary" :disabled="loading">
            <span class="btn-icon">⚡</span>
            CREATE EVENT
          </button>
          <button v-else @click="updateEvent" class="btn btn-success" :disabled="loading">
            <span class="btn-icon">🔄</span>
            UPDATE EVENT
          </button>
          <button v-if="isEditing" @click="resetForm" class="btn btn-secondary">
            CANCEL
          </button>
        </div>
      </div>
    </div>

    <!-- EVENTS GRID -->
    <div class="events-section">
      <div class="section-header">
        <h2>🔥 ACTIVE EVENTS</h2>
        <span class="event-count">{{ events.length }} events</span>
      </div>

      <div v-if="events.length === 0" class="empty-state">
        <span class="empty-icon">🎯</span>
        <h3>No events yet</h3>
        <p>Create your first event to get started!</p>
      </div>

      <div class="events-grid">
        <div v-for="event in events" :key="event.id" class="event-card">
          <div class="card-image">
            <img 
              v-if="event.image_path" 
              :src="getImageUrl(event.image_path)" 
              :alt="event.name"
              @error="e => e.target.src = 'https://placehold.co/600x400/1e293b/64748b?text=No+Image'"
            />
            <div v-else class="no-image">
              <span>🎪</span>
            </div>
            <div class="card-badge">{{ new Date(event.meeting_datetime) > new Date() ? 'UPCOMING' : 'PAST' }}</div>
          </div>
          
          <div class="card-content">
            <h3>{{ event.name }}</h3>
            <p class="description">{{ event.description || 'No description provided' }}</p>
            
            <div class="event-details">
              <div class="detail">
                <span class="detail-icon">📍</span>
                <span>{{ event.location || 'Location TBA' }}</span>
              </div>
              <div class="detail">
                <span class="detail-icon">🗺️</span>
                <a v-if="event.latitude && event.longitude" :href="getGoogleMapsLink(event.latitude, event.longitude)" target="_blank" class="maps-link-small">
                  View on Map →
                </a>
                <span v-else>No coordinates set</span>
              </div>
              <div class="detail">
                <span class="detail-icon">📅</span>
                <span>{{ formatDate(event.meeting_datetime) }}</span>
              </div>
              <div v-if="event.latitude && event.longitude" class="detail">
                <span class="detail-icon">📐</span>
                <span class="coords-small">{{ event.latitude.toFixed(4) }}, {{ event.longitude.toFixed(4) }}</span>
              </div>
            </div>

            <div class="card-actions">
              <button @click="editEvent(event)" class="action-btn edit-btn">
                ✏️ Edit
              </button>
              <button @click="deleteEvent(event.id)" class="action-btn delete-btn">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 40px;
  text-align: center;
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 0%, #e0d4ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.title-icon {
  font-size: 3rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 15px;
  font-weight: 500;
}

/* Form Container */
.form-container {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.form-icon {
  font-size: 2rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #a78bfa;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.input-field, .textarea-field {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus, .textarea-field:focus {
  outline: none;
  border-color: #a78bfa;
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
}

.textarea-field {
  resize: vertical;
  font-family: inherit;
}

/* Location Picker */
.location-picker-area {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 12px;
  padding: 16px;
}

.coordinates-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.coord-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  padding: 8px 16px;
  border-radius: 40px;
  border: 1px solid rgba(167, 139, 250, 0.3);
}

.coord-icon {
  font-size: 1.2rem;
}

.coord-text {
  font-family: monospace;
  font-size: 0.9rem;
  color: #a78bfa;
  font-weight: 600;
}

.clear-coords {
  background: #ef4444;
  border: none;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.maps-link, .maps-link-small {
  color: #60a5fa;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.2s;
}

.maps-link:hover, .maps-link-small:hover {
  color: #93c5fd;
  text-decoration: underline;
}

.btn-pick-location {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-pick-location:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.location-hint {
  font-size: 0.75rem;
  color: #f87171;
  margin-top: 8px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1e293b;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 800px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  font-size: 1.3rem;
}

.modal-close {
  background: rgba(239, 68, 68, 0.2);
  border: none;
  color: #f87171;
  font-size: 1.2rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #ef4444;
  color: white;
}

.modal-hint {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 12px;
  text-align: center;
}

.coords-small {
  font-family: monospace;
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Image Upload */
.image-upload-area {
  border: 2px dashed rgba(167, 139, 250, 0.5);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(15, 23, 42, 0.4);
}

.image-upload-area:hover {
  border-color: #a78bfa;
  background: rgba(167, 139, 250, 0.1);
}

.image-preview {
  position: relative;
  display: inline-block;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 12px;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ef4444;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}

.remove-image:hover {
  transform: scale(1.1);
}

.upload-placeholder {
  padding: 30px;
}

.upload-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 10px;
}

.upload-placeholder p {
  color: white;
  margin-bottom: 5px;
}

.upload-placeholder small {
  color: rgba(255, 255, 255, 0.5);
}

/* Loading Indicator */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin: 15px 0;
  color: white;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #a78bfa;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Buttons */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.btn {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
}

.btn-success {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Events Section */
.events-section {
  padding: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.event-count {
  background: rgba(167, 139, 250, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c4b5fd;
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.event-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(167, 139, 250, 0.5);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .card-image img {
  transform: scale(1.05);
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #a78bfa;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.event-details {
  margin-bottom: 20px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.detail-icon {
  font-size: 1rem;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
  background: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.delete-btn {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.4);
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 24px;
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 10px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    gap: 10px;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .form-container, .events-section {
    padding: 20px;
  }
  
  .hero {
    padding: 40px 20px;
  }
  
  .coordinates-display {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>