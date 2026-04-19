<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  // Validate form
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    submitError.value = 'Please fill in all required fields 🌿'
    setTimeout(() => {
      submitError.value = ''
    }, 3000)
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    submitError.value = 'Please enter a valid email address 📧'
    setTimeout(() => {
      submitError.value = ''
    }, 3000)
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  // Simulate API call (replace with your actual contact form submission)
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would send to your backend or email service
    console.log('Form submitted:', formData.value)
    
    submitSuccess.value = true
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    submitError.value = 'Something went wrong. Please try again later. 🌱'
    setTimeout(() => {
      submitError.value = ''
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">
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
    <div class="contact-wrapper">
      <!-- Hero Section -->
      <div class="contact-hero">
        <div class="icon-container">
          <span class="hero-icon">🌿</span>
          <span class="hero-icon pulse">💚</span>
          <span class="hero-icon">🌱</span>
        </div>
        <h1 class="hero-title">
          <span class="title-gradient">Let's Connect</span>
          <span class="title-sub">Grow Together</span>
        </h1>
        <p class="hero-description">
          Have questions, ideas, or just want to say hello? 
          <span class="highlight">We'd love to hear from you!</span>
        </p>
        <div class="decorative-line"></div>
      </div>

      <!-- Contact Cards & Form -->
      <div class="contact-container">
        <!-- Contact Info Cards -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Nature's Path</p>
            <p>Green Valley, GV 12345</p>
            <p>Earth, Milky Way</p>
          </div>

          <div class="info-card">
            <div class="info-icon">📧</div>
            <h3>Email Us</h3>
            <p>hello@naturevents.com</p>
            <p>support@naturevents.com</p>
            <p class="small">Response within 24h</p>
          </div>

          <div class="info-card">
            <div class="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>+1 (555) 765-4321</p>
            <p class="small">Mon-Fri, 9am-6pm</p>
          </div>

          <div class="info-card social">
            <div class="info-icon">🌐</div>
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#" class="social-link">Instagram</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <div class="form-header">
            <h2>Send us a message</h2>
            <p>We'll get back to you as soon as possible</p>
          </div>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label>
                <span class="label-icon">👤</span>
                Your Name *
              </label>
              <input 
                v-model="formData.name" 
                type="text" 
                placeholder="John Doe"
                class="form-input"
                :class="{ 'input-error': submitError && !formData.name }"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">📧</span>
                Email Address *
              </label>
              <input 
                v-model="formData.email" 
                type="email" 
                placeholder="hello@example.com"
                class="form-input"
                :class="{ 'input-error': submitError && !formData.email }"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">📝</span>
                Subject
              </label>
              <input 
                v-model="formData.subject" 
                type="text" 
                placeholder="What's this about?"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">💬</span>
                Message *
              </label>
              <textarea 
                v-model="formData.message" 
                rows="5"
                placeholder="Tell us what's on your mind..."
                class="form-textarea"
                :class="{ 'input-error': submitError && !formData.message }"
              ></textarea>
            </div>

            <!-- Success Message -->
            <div v-if="submitSuccess" class="success-message">
              <span class="success-icon">✅</span>
              <div>
                <strong>Message sent successfully!</strong>
                <p>Thanks for reaching out. We'll get back to you soon! 🌿</p>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="submitError" class="error-message">
              <span class="error-icon">⚠️</span>
              <div>
                <strong>Oops!</strong>
                <p>{{ submitError }}</p>
              </div>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting" class="button-content">
                <span>Send Message</span>
                <span class="button-icon">🌱</span>
              </span>
              <span v-else class="button-loading">
                <span class="spinner"></span>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Map Section (Optional) -->
      <div class="map-section">
        <div class="map-placeholder">
          <div class="map-overlay">
            <div class="map-icon">🗺️</div>
            <h3>Find Us Here</h3>
            <p>123 Nature's Path, Green Valley</p>
            <button class="map-button" @click="window.open('https://maps.google.com', '_blank')">
              Open in Google Maps →
            </button>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <span class="newsletter-icon">📬</span>
          <h3>Stay in the Loop</h3>
          <p>Subscribe to our newsletter for updates on events and community news</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address" class="newsletter-input" />
            <button class="newsletter-button">Subscribe</button>
          </div>
          <p class="newsletter-note">No spam, just nature love. Unsubscribe anytime. 🌿</p>
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

.contact-page {
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

/* Contact Wrapper */
.contact-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Hero Section */
.contact-hero {
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

/* Contact Container */
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  margin: 40px 0;
}

/* Contact Info Cards */
.contact-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.info-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid rgba(74, 222, 128, 0.2);
  transition: all 0.3s ease;
  animation: cardFadeIn 0.6s ease-out backwards;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.info-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 16px;
}

.info-card h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  color: #4ade80;
}

.info-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 6px;
}

.info-card .small {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.social-link {
  color: #4ade80;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.social-link:hover {
  color: white;
  transform: translateX(3px);
}

/* Contact Form */
.contact-form-wrapper {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(74, 222, 128, 0.2);
  animation: cardFadeIn 0.6s ease-out 0.2s backwards;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header h2 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: white;
}

.form-header p {
  color: rgba(255, 255, 255, 0.7);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4ade80;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 1rem;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.form-textarea {
  resize: vertical;
}

.input-error {
  border-color: #ef4444;
}

/* Success & Error Messages */
.success-message,
.error-message {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  margin-top: 8px;
}

.success-message {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
}

.error-message {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
}

.success-icon,
.error-icon {
  font-size: 1.2rem;
}

.success-message strong,
.error-message strong {
  display: block;
  margin-bottom: 4px;
}

.success-message p,
.error-message p {
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Submit Button */
.submit-button {
  padding: 14px 32px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content,
.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button-icon {
  transition: transform 0.3s;
}

.submit-button:hover .button-icon {
  transform: translateX(4px);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Map Section */
.map-section {
  margin: 60px 0;
}

.map-placeholder {
  background: linear-gradient(135deg, #1a3a2a, #0d2818);
  border-radius: 24px;
  height: 400px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 40, 24, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
}

.map-placeholder:hover .map-overlay {
  backdrop-filter: blur(2px);
  background: rgba(13, 40, 24, 0.6);
}

.map-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.map-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: white;
}

.map-overlay p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

.map-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.map-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
}

/* Newsletter Section */
.newsletter-section {
  margin: 60px 0 40px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05));
  border-radius: 48px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.newsletter-icon {
  font-size: 3rem;
  display: block;
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

.newsletter-section h3 {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.newsletter-section p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-input {
  flex: 1;
  padding: 14px 20px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 999px;
  color: white;
  font-size: 1rem;
}

.newsletter-input:focus {
  outline: none;
  border-color: #22c55e;
}

.newsletter-button {
  padding: 14px 28px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.newsletter-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
}

.newsletter-note {
  font-size: 0.75rem;
  margin-top: 16px;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 968px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .contact-info {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .contact-wrapper {
    padding: 20px 16px;
  }

  .contact-hero {
    padding: 40px 16px 20px;
  }

  .hero-icon {
    font-size: 2rem;
  }

  .contact-form-wrapper {
    padding: 28px 20px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .newsletter-section {
    padding: 40px 20px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-button {
    width: 100%;
  }

  .floating-element {
    font-size: 1.2rem;
    opacity: 0.1;
  }

  .map-section {
    margin: 40px 0;
  }

  .map-placeholder {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .title-sub {
    font-size: 1.2rem;
  }

  .info-card {
    padding: 20px;
  }

  .contact-form-wrapper {
    padding: 20px;
  }
}
</style>