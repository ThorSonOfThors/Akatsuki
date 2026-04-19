<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../lib/supabase'

const events = ref([])
const loading = ref(true)
const particles = ref([])

// 📥 FETCH EVENTS
const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('meeting_datetime', { ascending: true })

  if (!error) {
    events.value = data
  } else {
    console.error(error)
  }

  loading.value = false
}

// 📅 SORT LOGIC (CORE FEATURE)
const sortedEvents = computed(() => {
  const now = new Date()

  return [...events.value].sort((a, b) => {
    const dateA = new Date(a.meeting_datetime)
    const dateB = new Date(b.meeting_datetime)

    const isPastA = dateA < now
    const isPastB = dateB < now

    // upcoming first
    if (isPastA !== isPastB) return isPastA ? 1 : -1

    // then closest date
    return Math.abs(dateA - now) - Math.abs(dateB - now)
  })
})

// 📅 FORMAT
const formatDate = (date) => {
  if (!date) return 'TBD'
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 🖼 IMAGE URL
const getImageUrl = (path) => {
  if (!path) return null
  const { data } = supabase.storage
    .from('event-images')
    .getPublicUrl(path)

  return data.publicUrl
}

// 📍 GOOGLE MAP LINK
const getMapsLink = (lat, lng) => {
  if (!lat || !lng) return '#'
  return `https://www.google.com/maps?q=${lat},${lng}`
}

// 🌿 GENERATE PARTICLES
const generateParticles = () => {
  const particleCount = 50
  const newParticles = []
  
  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1
    })
  }
  
  particles.value = newParticles
}

onMounted(() => {
  fetchEvents()
  generateParticles()
})

onBeforeUnmount(() => {
  particles.value = []
})
</script>

<template>
  <div class="events-page">
    <!-- Animated Particles Background -->
    <div class="particles-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.left + '%',
          top: particle.top + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          animationDuration: particle.duration + 's',
          animationDelay: particle.delay + 's',
          opacity: particle.opacity
        }"
      ></div>
    </div>

    <!-- Decorative Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="orb orb-4"></div>

    <!-- Floating Leaves -->
    <div class="leaf leaf-1">🍃</div>
    <div class="leaf leaf-2">🌿</div>
    <div class="leaf leaf-3">🍂</div>
    <div class="leaf leaf-4">🌱</div>
    <div class="leaf leaf-5">🍁</div>
    <div class="leaf leaf-6">🌲</div>

    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content">
        <div class="icon-wrapper">
          <span class="icon-pulse">🌲</span>
        </div>
        <h1 class="hero-title">
          <span class="title-gradient">Uživo događaji</span>
          <span class="title-accent">Poziv prirode</span>
        </h1>
        <p class="hero-description">
          Pridružite se akciji. Svaki doprinos je bitan. 
          <span class="highlight">Vratite se prirodi, zabavite se sa zajednicom.</span>
        </p>
        <div class="decorative-line"></div>
      </div>
    </section>

    <!-- EVENTS GRID -->
    <section class="events-container">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading events...</p>
        <div class="loading-leaves">🌱 🌿 🍃 🍁</div>
      </div>

      <div v-else-if="sortedEvents.length === 0" class="empty-state">
        <span class="empty-icon">🌲</span>
        <h3>No events yet</h3>
        <p>Be the first to create an event and start the movement!</p>
      </div>

      <div v-else class="events-grid">
        <div
          v-for="(event, index) in sortedEvents"
          :key="event.id"
          class="event-card"
          :class="{ 'past-event': new Date(event.meeting_datetime) < new Date() }"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Card Glow Effect -->
          <div class="card-glow"></div>
          
          <!-- Image Section -->
          <div class="card-image">
            <img
              v-if="getImageUrl(event.image_path)"
              :src="getImageUrl(event.image_path)"
              :alt="event.name"
              loading="lazy"
            />
            <div v-else class="image-placeholder">
              <span>🌳</span>
            </div>
            <div class="image-overlay"></div>
            <div class="event-badge" :class="{ 'badge-past': new Date(event.meeting_datetime) < new Date() }">
              {{ new Date(event.meeting_datetime) < new Date() ? '🌿 Past Event' : '✨ Upcoming' }}
            </div>
          </div>

          <!-- Content Section -->
          <div class="card-content">
            <h3 class="event-title">{{ event.name }}</h3>
            <p class="event-description">
              {{ event.description || 'No description provided.' }}
            </p>

            <div class="event-meta">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ formatDate(event.meeting_datetime) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">📍</span>
                <span class="meta-text">{{ event.location || 'Location TBA' }}</span>
              </div>
              <a
                v-if="event.latitude && event.longitude"
                :href="getMapsLink(event.latitude, event.longitude)"
                target="_blank"
                class="meta-link"
              >
                <span class="meta-icon">🗺️</span>
                <span class="meta-text">View on Maps →</span>
              </a>
            </div>

            <div class="card-footer">
              <div class="status-indicator">
                <div class="status-dot" :class="{ 'status-dot-past': new Date(event.meeting_datetime) < new Date() }"></div>
                <span>{{ new Date(event.meeting_datetime) < new Date() ? 'Completed' : 'Active' }}</span>
              </div>
              <div class="nature-icon">🌿</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-content">
        <div class="cta-icon">🌱</div>
        <h2>Hvala vam na vašem doprinosu</h2>
        <p>Ukoliko želite da se priključite zajednici kontaktirajte nas!
        </p>
        <button class="cta-button" @click="$router.push('/kontakt')">
          <span class="button-text">Kontakt</span>
          <span class="button-icon">→</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.events-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A1A0F 0%, #1A3A2A 50%, #0D2818 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* Animated Particles */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  animation: floatParticle linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) translateX(10px) rotate(180deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(360deg);
  }
}

/* Decorative Orbs */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
  animation: floatOrb 20s ease-in-out infinite;
  z-index: 0;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #22c55e, transparent);
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #4ade80, transparent);
  bottom: -200px;
  left: -200px;
  animation-delay: -5s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #16a34a, transparent);
  top: 50%;
  left: 20%;
  animation-delay: -10s;
  opacity: 0.15;
}

.orb-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #059669, transparent);
  bottom: 30%;
  right: 10%;
  animation-delay: -7s;
  opacity: 0.2;
}

@keyframes floatOrb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(40px, -40px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

/* Floating Leaves */
.leaf {
  position: fixed;
  font-size: 2rem;
  pointer-events: none;
  opacity: 0.15;
  animation: floatLeaf 25s ease-in-out infinite;
  z-index: 0;
}

.leaf-1 {
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.leaf-2 {
  top: 70%;
  right: 8%;
  animation-delay: -5s;
  animation-duration: 30s;
}

.leaf-3 {
  bottom: 15%;
  left: 12%;
  animation-delay: -10s;
  animation-duration: 22s;
}

.leaf-4 {
  top: 40%;
  right: 15%;
  animation-delay: -3s;
  animation-duration: 28s;
}


.leaf-5 {
  top: 40%;
  right: 25%;
  animation-delay: -3s;
  animation-duration: 28s;
}

.leaf-6 {
  top: 49%;
  right: 16%;
  animation-delay: -3s;
  animation-duration: 28s;
}

@keyframes floatLeaf {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

/* Hero Section */
.hero {
  position: relative;
  z-index: 2;
  padding: 80px 20px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.icon-wrapper {
  margin-bottom: 30px;
  animation: bounceSoft 3s ease-in-out infinite;
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.icon-pulse {
  font-size: 4rem;
  display: inline-block;
  animation: pulseGlow 2s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 40px rgba(74, 222, 128, 0.8));
  }
}

.hero-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.title-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.title-accent {
  display: block;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #4ade80;
  margin-top: 8px;
}

.hero-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.7;
  color: #CBD5E1;
  max-width: 600px;
  margin: 0 auto 32px;
  font-weight: 400;
}

.highlight {
  display: block;
  margin-top: 12px;
  color: #4ade80;
  font-weight: 500;
  font-size: 0.95em;
  opacity: 0.9;
}

.decorative-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent);
  margin: 40px auto 0;
  border-radius: 2px;
  animation: linePulse 2s ease-in-out infinite;
}

@keyframes linePulse {
  0%, 100% {
    width: 60px;
    opacity: 0.5;
  }
  50% {
    width: 100px;
    opacity: 1;
  }
}

/* Events Container */
.events-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 80px 20px;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 32px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(34, 197, 94, 0.3);
  border-top-color: #22c55e;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-leaves {
  font-size: 1.5rem;
  margin-top: 20px;
  opacity: 0.7;
  animation: fadePulse 1.5s ease-in-out infinite;
}

@keyframes fadePulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 32px;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
  animation: bounceSoft 2s ease-in-out infinite;
}

.empty-state h3 {
  font-size: 1.8rem;
  margin-bottom: 12px;
  color: #4ade80;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.7);
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
}

.event-card {
  position: relative;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  animation: cardFadeIn 0.6s ease-out backwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.event-card:hover {
  transform: translateY(-8px);
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.past-event {
  opacity: 0.7;
}

.past-event:hover {
  opacity: 0.9;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.event-card:hover .card-glow {
  transform: scaleX(1);
}

/* Card Image */
.card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a3a2a, #0d2818);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .card-image img {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: linear-gradient(135deg, #1e3a2a, #0d2818);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.event-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  background: rgba(34, 197, 94, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: white;
}

.badge-past {
  background: rgba(100, 116, 139, 0.9);
}

/* Card Content */
.card-content {
  padding: 24px;
}

.event-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: white;
  line-height: 1.3;
}

.event-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.meta-item, .meta-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s;
}

.meta-link:hover {
  color: #4ade80;
  transform: translateX(3px);
}

.meta-icon {
  font-size: 1rem;
  min-width: 24px;
}

.meta-text {
  line-height: 1.4;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #4ade80;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s ease-in-out infinite;
}

.status-dot-past {
  background: #64748b;
  animation: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.nature-icon {
  font-size: 1.2rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.event-card:hover .nature-icon {
  opacity: 1;
  animation: wiggle 0.5s ease;
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

/* CTA Section */
.cta-section {
  position: relative;
  z-index: 2;
  margin: 60px 20px 40px;
  max-width: calc(100% - 40px); /* Add this - ensures it doesn't exceed viewport */
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05));
  border-radius: 48px;
  padding: 60px 40px ; 
  text-align: center;
  backdrop-filter: blur(1px);
  border: 1px solid rgba(74, 222, 128, 0.2);
  width: 100%;
}





.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: bounceSoft 2s ease-in-out infinite;
}

.cta-section h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 16px;
  color: white;
}

.cta-section p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  font-size: 1rem;
}

.cta-button {
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
  gap: 16px;
}

.button-icon {
  transition: transform 0.3s;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 60px 20px 40px;
  }

  .icon-pulse {
    font-size: 3rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .events-container {
    padding: 20px 16px;
  }

  .card-image {
    height: 200px;
  }

  .event-title {
    font-size: 1.3rem;
  }

  .cta-section {
    padding: 40px 20px;
    margin: 40px 16px 30px;
  }

  .leaf {
    font-size: 1.2rem;
    opacity: 0.1;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .title-accent {
    font-size: 1.3rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .event-meta {
    font-size: 0.75rem;
  }

  .card-content {
    padding: 20px;
  }
}
</style>