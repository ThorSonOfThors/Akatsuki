<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = '💪 Fill in both fields, king!'
    return
  }

  errorMsg.value = ''
  isLoading.value = true

  try {
    await auth.login(email.value, password.value)
    
    // Epic success animation before redirect
    errorMsg.value = ''
    setTimeout(() => {
      router.push('/admin')
    }, 500)
  } catch (err) {
    errorMsg.value = err.message || '❌ Invalid credentials, try again!'
    isLoading.value = false
  }
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="giga-container">
    <!-- Animated background -->
    <div class="animated-bg">
      <div class="gradient-orb orb1"></div>
      <div class="gradient-orb orb2"></div>
      <div class="gradient-orb orb3"></div>
    </div>

    <!-- Main login card -->
    <div class="login-card">
      <div class="card-header">
        <div class="icon-container">
          <span class="crown-icon">👑</span>
          <span class="lightning-icon">⚡</span>
        </div>
        <h1 class="title">
          <span class="title-text">GIGA</span>
          <span class="title-accent">CHAD</span>
        </h1>
        <p class="subtitle">Access the admin zone, legend</p>
      </div>

      <div class="input-group">
        <div class="input-icon">📧</div>
        <input 
          v-model="email" 
          type="email"
          placeholder="Enter your email" 
          class="giga-input"
          @keypress="handleKeyPress"
          :class="{ 'input-error': errorMsg }"
        />
      </div>

      <div class="input-group">
        <div class="input-icon">🔒</div>
        <input 
          v-model="password" 
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password" 
          class="giga-input"
          @keypress="handleKeyPress"
          :class="{ 'input-error': errorMsg }"
        />
        <button 
          type="button" 
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '🙈' : '👁️' }}
        </button>
      </div>

      <div v-if="errorMsg" class="error-message">
        <span class="error-icon">💀</span>
        {{ errorMsg }}
      </div>

      <button 
        @click="handleLogin" 
        class="giga-button"
        :disabled="isLoading"
      >
        <span v-if="!isLoading" class="btn-content">
          <span class="btn-icon">🚀</span>
          ENTER  
          <span class="btn-icon">💪</span>
        </span>
        <span v-else class="btn-loading">
          <span class="spinner"></span>
          AUTHENTICATING...
        </span>
      </button>

      <div class="card-footer">
        <p class="motivation">💪 Only the strongest admins may pass 💪</p>
        <div class="status-bars">
          <div class="stat">STR: ∞</div>
          <div class="stat">INT: ∞</div>
          <div class="stat">CHAD: 100%</div>
        </div>
      </div>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <div class="particle">⚡</div>
      <div class="particle">💪</div>
      <div class="particle">👑</div>
      <div class="particle">🔥</div>
      <div class="particle">🎯</div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.giga-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out;
}

.orb1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  top: -250px;
  left: -250px;
  animation-delay: 0s;
}

.orb2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.6));
  bottom: -300px;
  right: -300px;
  animation-delay: 5s;
}

.orb3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.5), rgba(59, 130, 246, 0.5));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Login Card */
.login-card {
  position: relative;
  z-index: 10;
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  padding: 48px 40px;
  width: 90%;
  max-width: 480px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.icon-container {
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.crown-icon, .lightning-icon {
  font-size: 3rem;
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

.crown-icon {
  margin-right: 10px;
  animation-delay: 0s;
}

.lightning-icon {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.title-text {
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title-accent {
  background: linear-gradient(135deg, #fbbf24, #ef4444);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
  font-size: 2.5rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Input Groups */
.input-group {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  font-size: 1.2rem;
  z-index: 2;
  pointer-events: none;
}

.giga-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.giga-input:focus {
  outline: none;
  border-color: #a78bfa;
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.2);
  background: rgba(15, 23, 42, 0.9);
}

.giga-input.input-error {
  border-color: #ef4444;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.toggle-password {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  transition: all 0.2s;
  color: rgba(255, 255, 255, 0.6);
}

.toggle-password:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Error Message */
.error-message {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #f87171;
  font-weight: 600;
  font-size: 0.85rem;
  animation: shake 0.3s ease;
}

.error-icon {
  font-size: 1.1rem;
}

/* Giga Button */
.giga-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 16px;
  color: white;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.giga-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.giga-button:hover::before {
  left: 100%;
}

.giga-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
}

.giga-button:active:not(:disabled) {
  transform: translateY(0);
}

.giga-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.btn-icon {
  font-size: 1.2rem;
  animation: wiggle 1s ease-in-out infinite;
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

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

/* Card Footer */
.card-footer {
  margin-top: 32px;
  text-align: center;
}

.motivation {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.status-bars {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat {
  font-size: 0.7rem;
  font-weight: 700;
  color: #a78bfa;
  letter-spacing: 0.5px;
}

/* Floating Particles */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.particle {
  position: absolute;
  font-size: 1.5rem;
  animation: floatParticle 15s infinite linear;
  opacity: 0.3;
}

.particle:nth-child(1) {
  top: 10%;
  left: 5%;
  animation-duration: 12s;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  top: 70%;
  left: 85%;
  animation-duration: 14s;
  animation-delay: 2s;
}

.particle:nth-child(3) {
  top: 85%;
  left: 10%;
  animation-duration: 16s;
  animation-delay: 4s;
}

.particle:nth-child(4) {
  top: 20%;
  left: 90%;
  animation-duration: 11s;
  animation-delay: 1s;
}

.particle:nth-child(5) {
  top: 50%;
  left: 50%;
  animation-duration: 18s;
  animation-delay: 3s;
}

@keyframes floatParticle {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(20px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    padding: 32px 24px;
    margin: 20px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .title-accent {
    font-size: 1.8rem;
  }
  
  .crown-icon, .lightning-icon {
    font-size: 2rem;
  }
  
  .status-bars {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>