<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { user, loading } = storeToRefs(authStore)

const router = useRouter()
const isMobile = ref(false)
const isMenuOpen = ref(false)

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <nav class="nav" :class="{ 'nav-mobile-open': isMenuOpen }">
    <div class="nav-container">
      <!-- Logo / Brand -->
      <router-link to="/home" class="logo" @click="closeMenu">
        <span class="logo-text">Akatsuki</span>
        <span class="logo-dot"></span>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="nav-links-desktop">
        <router-link to="/home" class="nav-link" active-class="active">Home</router-link>
        <router-link to="/zabava" class="nav-link" active-class="active">Zabava</router-link>
        <router-link to="/kontakt" class="nav-link" active-class="active">Kontakt</router-link>
        <router-link to="/o-nama" class="nav-link" active-class="active">O nama</router-link>
        <router-link to="/mesto-okupljanja" class="nav-link" active-class="active">Mesto okupljanja</router-link>
        
        <!-- Auth Section Desktop -->
        <div class="auth-section">
          <template v-if="user">
            <span class="email">{{ user.email }}</span>
            <button @click="handleLogout" :disabled="loading" class="logout-btn">
              {{ loading ? '...' : 'Logout' }}
            </button>
          </template>
        </div>
      </div>

      <!-- Mobile Hamburger Button -->
      <button 
        v-if="isMobile" 
        class="hamburger" 
        @click="toggleMenu"
        :class="{ 'hamburger-active': isMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Menu Overlay with Nature Background -->
      <div v-if="isMobile && isMenuOpen" class="mobile-menu-overlay" @click="closeMenu">
        <!-- Animated Particles Background -->
        <div class="particles-container">
          <div
            v-for="particle in 20"
            :key="particle"
            class="particle"
            :style="{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              animationDuration: Math.random() * 10 + 5 + 's',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.5 + 0.3
            }"
          ></div>
        </div>

        <!-- Decorative Orbs -->
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>

        <!-- Floating Leaves -->
        <div class="leaf leaf-1">🍃</div>
        <div class="leaf leaf-2">🌿</div>
        <div class="leaf leaf-3">🍂</div>
        <div class="leaf leaf-4">🌱</div>

        <div class="mobile-menu-container" @click.stop>
          
          
          <!-- Direct Router Links -->
          <div class="mobile-nav-links">


            <router-link to="/home" class="mobile-nav-link" active-class="mobile-active" @click="closeMenu">
              <span class="nav-icon">🌿</span>
              <span class="nav-text">Home</span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/zabava" class="mobile-nav-link" active-class="mobile-active" @click="closeMenu">
              <span class="nav-icon">🌿</span>
              <span class="nav-text">Zabava</span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/kontakt" class="mobile-nav-link" active-class="mobile-active" @click="closeMenu">
              <span class="nav-icon">📞</span>
              <span class="nav-text">Kontakt</span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/o-nama" class="mobile-nav-link" active-class="mobile-active" @click="closeMenu">
              <span class="nav-icon">🌳</span>
              <span class="nav-text">O nama</span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/mesto-okupljanja" class="mobile-nav-link" active-class="mobile-active" @click="closeMenu">
              <span class="nav-icon">📍</span>
              <span class="nav-text">Mesto okupljanja</span>
              <span class="nav-arrow">→</span>
            </router-link>
          </div>

          <!-- Mobile Auth Section -->
          <div v-if="user" class="mobile-auth-section">
            <div class="mobile-email">
              <span class="email-icon">📧</span>
              {{ user.email }}
            </div>
            <button @click="handleLogout" :disabled="loading" class="mobile-logout-btn">
              <span class="logout-icon">🚪</span>
              {{ loading ? 'Logging out...' : 'Logout' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
}

.logo-text {
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.logo-dot {
  width: 4px;
  height: 4px;
  background: #42b883;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* Desktop Navigation */
.nav-links-desktop {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link.active {
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

/* Auth Section Desktop */
.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.email {
  color: #a0a0a0;
  font-size: 0.85rem;
  font-family: monospace;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-1px);
}

.logout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 10px;
  transition: all 0.3s ease;
  transform-origin: left;
}

.hamburger-active span:nth-child(1) {
  transform: rotate(45deg);
}

.hamburger-active span:nth-child(2) {
  opacity: 0;
}

.hamburger-active span:nth-child(3) {
  transform: rotate(-45deg);
}

/* Mobile Menu Overlay - Nature Background */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0A1A0F 0%, #1A3A2A 50%, #0D2818 100%);
  z-index: 1050;
  animation: fadeIn 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Animated Particles */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 3;
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
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
  animation: floatOrb 20s ease-in-out infinite;
  z-index: 3;
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
  position: absolute;
  font-size: 2rem;
  pointer-events: none;
  opacity: 0.15;
  animation: floatLeaf 25s ease-in-out infinite;
  z-index: 3;
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

/* Mobile Menu Container - Fully Transparent */
.mobile-menu-container {
  position: relative;
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 85vh;
  background: transparent;
  border-radius: 32px;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 3;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(74, 222, 128, 0.2);
  background: transparent;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff, #4ade80);
  -webkit-background-clip: text;
  background-clip: initial;
  -webkit-text-fill-color: transparent;
}

.logo-icon {
  font-size: 1.8rem;
  animation: bounceSoft 2s ease-in-out infinite;
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.mobile-close {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-close:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: rotate(90deg);
  color: #ef4444;
}

/* Direct Router Links - Transparent Glass Effect */
.mobile-nav-links {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  overflow-y: auto;
  background: transparent;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.2), transparent);
  transition: left 0.5s;
}

.mobile-nav-link:hover::before {
  left: 100%;
}

.mobile-nav-link.mobile-active {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.4);
  transform: translateX(5px);
}

.mobile-nav-link:hover {
  background: rgba(74, 222, 128, 0.12);
  color: #4ade80;
  transform: translateX(10px);
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.nav-icon {
  font-size: 1.3rem;
  min-width: 35px;
  filter: drop-shadow(0 0 5px rgba(74, 222, 128, 0.3));
}

.nav-text {
  flex: 1;
}

.nav-arrow {
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.mobile-nav-link:hover .nav-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* Mobile Auth Section - Transparent Glass */
.mobile-auth-section {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(74, 222, 128, 0.15);
  background: transparent;
}

.mobile-email {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-family: monospace;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  margin-bottom: 1rem;
  word-break: break-all;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.email-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 0 3px rgba(74, 222, 128, 0.3));
}

.mobile-logout-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.12);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  cursor: pointer;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.mobile-logout-btn:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #ff6b6b;
  transform: translateY(-2px);
  border: 1px solid rgba(239, 68, 68, 0.5);
}

.logout-icon {
  font-size: 1.1rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links-desktop {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
  
  .nav-container {
    padding: 0.875rem 1.5rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .nav {
    width: 100%;
    left: 0;
    right: 0;
  }
}

/* Tablet optimization */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-links-desktop {
    gap: 1.5rem;
  }
  
  .nav-container {
    padding: 1rem 1.5rem;
  }
}
</style>