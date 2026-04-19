<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { number: '50+', label: 'Events Hosted', icon: '🎉' },
  { number: '10K+', label: 'Community Members', icon: '👥' },
  { number: '25+', label: 'Partner Organizations', icon: '🤝' },
  { number: '100%', label: 'Nature Love', icon: '🌿' }
])

const teamMembers = ref([
  { name: 'Sarah Green', role: 'Founder & CEO', bio: 'Nature enthusiast with 15+ years in event management', icon: '🌱', color: '#22c55e' },
  { name: 'Michael Forest', role: 'Event Director', bio: 'Expert in sustainable event planning', icon: '🌲', color: '#4ade80' },
  { name: 'Emma Rivers', role: 'Community Manager', bio: 'Building bridges between people and nature', icon: '💧', color: '#3b82f6' },
  { name: 'David Leaf', role: 'Creative Director', bio: 'Bringing nature-inspired designs to life', icon: '🍃', color: '#a78bfa' }
])

const values = ref([
  { title: 'Sustainability', description: 'We prioritize eco-friendly practices in every event we organize.', icon: '♻️' },
  { title: 'Community', description: 'Building meaningful connections between people who love nature.', icon: '🤝' },
  { title: 'Innovation', description: 'Creating unique experiences that blend technology with nature.', icon: '💡' },
  { title: 'Inclusivity', description: 'Welcoming everyone to join our nature-loving community.', icon: '🌈' }
])

const milestones = ref([
  { year: '2020', title: 'The Beginning', description: 'Started as a small community of nature lovers' },
  { year: '2021', title: 'First Major Event', description: 'Hosted our first 500+ attendee nature festival' },
  { year: '2022', title: 'Global Reach', description: 'Expanded to 5 countries with virtual events' },
  { year: '2023', title: 'Green Initiative', description: 'Planted 10,000 trees worldwide' },
  { year: '2024', title: 'Community Milestone', description: 'Reached 10,000 active members' }
])

const animateNumbers = ref(false)

onMounted(() => {
  // Trigger number animation when component mounts
  setTimeout(() => {
    animateNumbers.value = true
  }, 500)
})
</script>

<template>
  <div class="about-page">
    <!-- Animated Background Particles -->
    <div class="particles-container">
      <div class="particle" v-for="i in 40" :key="i" :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDuration: (Math.random() * 15 + 10) + 's',
        animationDelay: (Math.random() * 10) + 's',
        opacity: Math.random() * 0.3 + 0.1,
        width: (Math.random() * 4 + 2) + 'px',
        height: (Math.random() * 4 + 2) + 'px'
      }"></div>
    </div>

    <!-- Decorative Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="orb orb-4"></div>

    <!-- Floating Nature Elements -->
    <div class="floating-element leaf-1">🍃</div>
    <div class="floating-element leaf-2">🌿</div>
    <div class="floating-element leaf-3">🍂</div>
    <div class="floating-element leaf-4">🌱</div>
    <div class="floating-element flower-1">🌸</div>
    <div class="floating-element flower-2">🌺</div>

    <!-- Main Content -->
    <div class="about-wrapper">
      <!-- Hero Section -->
      <div class="about-hero">
        <div class="icon-container">
          <span class="hero-icon">🌿</span>
          <span class="hero-icon pulse">💚</span>
          <span class="hero-icon">🌍</span>
        </div>
        <h1 class="hero-title">
          <span class="title-gradient">Our Story</span>
          <span class="title-sub">Rooted in Nature</span>
        </h1>
        <p class="hero-description">
          We believe in the power of community and the beauty of nature.
          <span class="highlight">Connecting people with the great outdoors, one event at a time.</span>
        </p>
        <div class="decorative-line"></div>
      </div>

      <!-- Mission Statement -->
      <div class="mission-section">
        <div class="mission-card">
          <div class="mission-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>To create unforgettable experiences that bring people closer to nature and each other, fostering a global community of nature enthusiasts who care about our planet.</p>
        </div>
        <div class="vision-card">
          <div class="vision-icon">👁️</div>
          <h2>Our Vision</h2>
          <p>A world where every person has access to meaningful nature experiences and communities thrive in harmony with the environment.</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-number">
              <span v-if="animateNumbers" class="count-up">{{ stat.number }}</span>
              <span v-else>{{ stat.number }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Our Values -->
      <div class="values-section">
        <h2 class="section-title">
          <span class="title-decoration">✦</span>
          Our Core Values
          <span class="title-decoration">✦</span>
        </h2>
        <div class="values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-icon">{{ value.icon }}</div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>

      <!-- Journey Timeline -->
      <div class="journey-section">
        <h2 class="section-title">
          <span class="title-decoration">🌱</span>
          Our Journey
          <span class="title-decoration">🌿</span>
        </h2>
        <div class="timeline">
          <div v-for="(milestone, index) in milestones" :key="milestone.year" class="timeline-item" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="timeline-dot">
              <div class="dot-inner"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3 class="timeline-title">{{ milestone.title }}</h3>
              <p class="timeline-description">{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section">
        <h2 class="section-title">
          <span class="title-decoration">👥</span>
          Meet the Team
          <span class="title-decoration">🌿</span>
        </h2>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.name" class="team-card">
            <div class="team-icon" :style="{ background: `linear-gradient(135deg, ${member.color}, ${member.color}80)` }">
              {{ member.icon }}
            </div>
            <h3>{{ member.name }}</h3>
            <div class="team-role">{{ member.role }}</div>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-social">
              <a href="#" class="social-icon">🔗</a>
              <a href="#" class="social-icon">📧</a>
              <a href="#" class="social-icon">💼</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <div class="cta-content">
          <div class="cta-icon">🌱</div>
          <h2>Join Our Community</h2>
          <p>Be part of something bigger. Together, we can make a difference.</p>
          <div class="cta-buttons">
            <button class="cta-button primary" @click="$router.push('/mesto-okupljanja')">
              Explore Events
              <span class="button-arrow">→</span>
            </button>
            <button class="cta-button secondary" @click="$router.push('/kontakt')">
              Get in Touch
              <span class="button-arrow">→</span>
            </button>
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

.about-page {
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
  animation: floatParticle linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) translateX(15px) rotate(180deg);
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

/* Floating Elements */
.floating-element {
  position: fixed;
  font-size: 2rem;
  pointer-events: none;
  opacity: 0.15;
  animation: floatElement 20s ease-in-out infinite;
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
  animation-duration: 25s;
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

.flower-1 {
  top: 20%;
  right: 20%;
  animation-delay: -7s;
  animation-duration: 18s;
}

.flower-2 {
  bottom: 25%;
  left: 8%;
  animation-delay: -12s;
  animation-duration: 30s;
}

@keyframes floatElement {
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

/* About Wrapper */
.about-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Hero Section */
.about-hero {
  text-align: center;
  padding: 60px 20px 40px;
}

.icon-container {
  margin-bottom: 30px;
}

.hero-icon {
  font-size: 3rem;
  display: inline-block;
  margin: 0 10px;
  animation: pulseGlow 2s ease-in-out infinite;
}

.hero-icon:nth-child(2) {
  animation-delay: 0.5s;
}

.hero-icon:nth-child(3) {
  animation-delay: 1s;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5));
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.8));
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

.title-sub {
  display: block;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #4ade80;
  margin-top: 8px;
}

.hero-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.7;
  color: #CBD5E1;
  max-width: 600px;
  margin: 0 auto 32px;
}

.highlight {
  display: block;
  margin-top: 12px;
  color: #4ade80;
  font-weight: 500;
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

/* Mission Section */
.mission-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 60px 0;
}

.mission-card,
.vision-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.mission-card:hover,
.vision-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mission-icon,
.vision-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.mission-card h2,
.vision-card h2 {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #4ade80;
}

.mission-card p,
.vision-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  margin: 60px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px 20px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 222, 128, 0.5);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4ade80;
  margin-bottom: 8px;
}

.count-up {
  animation: countUp 1s ease-out;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Values Section */
.values-section {
  margin: 80px 0;
}

.section-title {
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.title-decoration {
  font-size: 1.5rem;
  opacity: 0.7;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.value-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.value-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 222, 128, 0.5);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.value-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #4ade80;
}

.value-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Journey Timeline */
.journey-section {
  margin: 80px 0;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #22c55e, #4ade80, #22c55e);
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  animation: fadeInLeft 0.6s ease-out backwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #22c55e;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-inner {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.timeline-content {
  width: calc(50% - 40px);
  padding: 20px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-right: auto;
}

.timeline-content:hover {
  transform: translateY(-3px);
  border-color: rgba(74, 222, 128, 0.5);
}

.timeline-year {
  font-size: 0.85rem;
  color: #4ade80;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: white;
}

.timeline-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Team Section */
.team-section {
  margin: 80px 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.team-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 222, 128, 0.5);
}

.team-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.team-card:hover .team-icon {
  transform: scale(1.05);
}

.team-card h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: white;
}

.team-role {
  color: #4ade80;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.team-bio {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #22c55e;
  transform: translateY(-2px);
}

/* CTA Section */
.cta-section {
  margin: 80px 0 40px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05));
  border-radius: 48px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: bounceSoft 2s ease-in-out infinite;
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cta-section h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 16px;
}

.cta-section p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  font-size: 1rem;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-button.primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(74, 222, 128, 0.5);
}

.cta-button:hover {
  transform: translateY(-2px);
}

.cta-button.primary:hover {
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
}

.cta-button.secondary:hover {
  background: rgba(74, 222, 128, 0.2);
}

.button-arrow {
  transition: transform 0.3s;
}

.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 968px) {
  .mission-section {
    grid-template-columns: 1fr;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-dot {
    left: 20px;
  }

  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px !important;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    margin-left: 60px;
  }
}

@media (max-width: 768px) {
  .about-wrapper {
    padding: 20px 16px;
  }

  .about-hero {
    padding: 40px 16px 20px;
  }

  .hero-icon {
    font-size: 2rem;
  }

  .mission-card,
  .vision-card {
    padding: 28px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }

  .floating-element {
    font-size: 1.2rem;
    opacity: 0.1;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .title-sub {
    font-size: 1.2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 30px 20px;
  }

  .timeline-content {
    padding: 16px;
  }

  .timeline-title {
    font-size: 1rem;
  }
}
</style>