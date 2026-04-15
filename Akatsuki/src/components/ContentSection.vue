<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger if not already registered globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

onMounted(() => {
  // Animate content on scroll
  const ctx = gsap.context(() => {
    // Title animation
    gsap.fromTo('.section-title',
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.content',
          start: 'top 70%',
          end: 'top 50%',
          scrub: 0.5,
        }
      }
    )

    // Description animation
    gsap.fromTo('.section-description',
      { 
        opacity: 0, 
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.content',
          start: 'top 70%',
          end: 'top 50%',
          scrub: 0.5,
        }
      }
    )

    // Button animation with pulse effect
    gsap.fromTo('.cta-button',
      { 
        opacity: 0, 
        scale: 0.9 
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.6,
        scrollTrigger: {
          trigger: '.content',
          start: 'top 70%',
          end: 'top 50%',
          scrub: 0.5,
        }
      }
    )

    // Floating particles animation
    gsap.to('.particle', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 1,
        from: 'random'
      }
    })
  })

  return () => ctx.revert()
})
</script>

<template>
  <section class="content">
    <!-- Animated background particles -->
    <div class="particles-container">
      <div v-for="i in 20" :key="i" class="particle" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.3 + 0.1
      }"></div>
    </div>

    <!-- Decorative gradient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="content-wrapper">
      <!-- Icon/Emoji with animation -->
      <div class="icon-wrapper">
        
      </div>

      <!-- Main Title -->
      <h2 class="section-title">
        <span class="title-gradient">Pridruži se akciji</span>
      </h2>

      <!-- Description -->
      <p class="section-description">
        Organizujemo čišćenje prirode, sadnju drveća i okupljanje ljudi koji žele da naprave promenu.
        <span class="highlight">Svaka mala akcija donosi veliku promenu.</span>
      </p>

      <!-- CTA Button with icon -->
      <button class="cta-button">
        <span class="button-text">Pogledaj događaje</span>
        <svg class="button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Decorative line -->
      <div class="decorative-line"></div>
    </div>
  </section>
</template>

<style scoped>
.content {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A1A0F 0%, #1A3A2A 50%, #0D2818 100%);
  color: white;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
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
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, #22c55e, #4ade80);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

/* Decorative Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
  animation: floatOrb 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #22c55e, transparent);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #4ade80, transparent);
  bottom: -150px;
  left: -150px;
  animation-delay: -5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #16a34a, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
  opacity: 0.15;
}

@keyframes floatOrb {
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

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Icon Wrapper */
.icon-wrapper {
  margin-bottom: 30px;
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

/* Title */
.section-title {
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
  position: relative;
  display: inline-block;
}

/* Description */
.section-description {
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

/* CTA Button */
.cta-button {
  position: relative;
  padding: 16px 36px;
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
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  letter-spacing: 0.5px;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.5);
  gap: 16px;
}

.cta-button:active {
  transform: translateY(0) scale(0.98);
}

.button-text {
  position: relative;
  z-index: 1;
}

.button-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

/* Decorative Line */
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

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    width: 95%;
    padding: 30px 20px;
    backdrop-filter: blur(5px);
  }

  .icon-pulse {
    font-size: 3rem;
  }

  .section-title {
    margin-bottom: 16px;
  }

  .section-description {
    margin-bottom: 28px;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 0.95rem;
  }

  .orb-1 {
    width: 250px;
    height: 250px;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 24px 16px;
  }

  .icon-pulse {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-description {
    font-size: 0.95rem;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}

/* Smooth animations for better performance */
.content-wrapper > * {
  will-change: transform, opacity;
}

/* Custom scrollbar for the component if needed */
@media (min-width: 768px) {
  .content {
    scrollbar-width: thin;
  }
}
</style>