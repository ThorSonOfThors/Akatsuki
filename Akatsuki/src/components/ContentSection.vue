<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

let observer = null
let scrollTrigger = null
let scrollTriggerParallax = null

onMounted(() => {
  // FORCE kill all existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  
  setTimeout(() => {
    const section = document.querySelector('.content-section')
    const wrapper = document.querySelector('.content-wrapper')
    const logo = document.querySelector('.section-logo')
    const title = document.querySelector('.section-title')
    const desc = document.querySelector('.section-description')
    const highlight = document.querySelector('.highlight')
    const button = document.querySelector('.cta-button')
    const line = document.querySelector('.decorative-line')
    const orbs = document.querySelectorAll('.orb')
    const leaves = document.querySelectorAll('.floating-leaf')
    
    // Set clean initial states - gently hidden
    gsap.set(wrapper, {
      opacity: 0,
      y: 30,
      scale: 0.95
    })
    
    gsap.set(title, {
      opacity: 0,
      y: 20,
      scale: 0.95
    })
    
    gsap.set(desc, {
      opacity: 0,
      y: 20,
      scale: 0.95
    })
    
    gsap.set(highlight, {
      opacity: 0,
      y: 10
    })
    
    gsap.set(logo, {
      opacity: 0,
      y: 30,
      scale: 0.9
    })
    
    gsap.set(button, {
      opacity: 0,
      y: 20,
      scale: 0.95
    })
    
    gsap.set(line, {
      width: 0,
      opacity: 0
    })
    
    gsap.set(orbs, { opacity: 0 })
    gsap.set(leaves, { opacity: 0 })
    
    // Remove any blur from section bottom
    gsap.set('.content-section', { 
      clearProps: 'filter',
      marginBottom: 0,
      paddingBottom: 0
    })
    
    // SMOOTH ANIMATION FUNCTION
    const triggerAnimation = () => {
      // Reset any previous animations
      gsap.killTweensOf([wrapper, title, desc, highlight, logo, button, line, orbs, leaves])
      
      // Create master timeline for smooth coordinated animation
      const master = gsap.timeline({
        onComplete: () => {
          console.log('✨ Animation complete')
        }
      })
      
      // 1. CONTENT WRAPPER fades in
      master.to(wrapper, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 0)
      
      // 2. TITLE fades in
      master.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.2)
      
      // 3. DESCRIPTION fades in
      master.to(desc, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.3)
      
      // 4. HIGHLIGHT fades in
      master.to(highlight, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.4)
      
      // 5. LOGO fades in
      master.to(logo, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.5)
      
      // 6. BUTTON fades in
      master.to(button, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.6)
      
      // 7. DECORATIVE LINE slides in
      master.to(line, {
        width: 60,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.7)
      
      // 8. ORBS fade in gently
      master.to(orbs, {
        opacity: 0.3,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.2)
      
      // 9. LEAVES fade in gently
      master.to(leaves, {
        opacity: 0.15,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out'
      }, 0.3)
    }
    
    // INTERSECTION OBSERVER - triggers when section becomes visible
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('🌿 Section detected! Animating...')
          triggerAnimation()
        }
      })
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    })
    
    observer.observe(section)
    
    // SCROLLTRIGGER for smooth parallax effects
    scrollTrigger = ScrollTrigger.create({
      trigger: ".content-section",
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => {
        console.log('🎯 ScrollTrigger entered')
        triggerAnimation()
      },
      onLeave: () => {
        console.log('👋 Left section - resetting')
        // Gentle reset for next time
        gsap.set([wrapper, title, desc, highlight, logo, button, line], {
          opacity: 0,
          clearProps: 'all'
        })
        gsap.set(wrapper, { y: 30, scale: 0.95 })
        gsap.set(title, { y: 20, scale: 0.95 })
        gsap.set(desc, { y: 20, scale: 0.95 })
        gsap.set(highlight, { y: 10 })
        gsap.set(logo, { y: 30, scale: 0.9 })
        gsap.set(button, { y: 20, scale: 0.95 })
        gsap.set(line, { width: 0 })
        gsap.set(orbs, { opacity: 0 })
        gsap.set(leaves, { opacity: 0 })
      },
      onEnterBack: () => {
        console.log('🔄 Scrolled back up - re-animating')
        triggerAnimation()
      },
      toggleActions: "play none none reverse"
    })
    
    // Gentle parallax effects while scrolling
    scrollTriggerParallax = ScrollTrigger.create({
      trigger: ".content-section",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress
        if (progress > 0 && progress < 1) {
          // Smooth, gentle movement
          gsap.to('.orb-1', { x: progress * 30, y: progress * -20, duration: 0.1, overwrite: true, ease: 'power1.out' })
          gsap.to('.orb-2', { x: progress * -25, y: progress * 25, duration: 0.1, overwrite: true, ease: 'power1.out' })
          gsap.to('.orb-3', { x: progress * 15, y: progress * -15, duration: 0.1, overwrite: true, ease: 'power1.out' })
          gsap.to('.leaf-1', { x: progress * 20, y: progress * -15, duration: 0.1, overwrite: true, ease: 'power1.out' })
          gsap.to('.leaf-2', { x: progress * -18, y: progress * 18, duration: 0.1, overwrite: true, ease: 'power1.out' })
          gsap.to('.leaf-3', { x: progress * 12, y: progress * -12, duration: 0.1, overwrite: true, ease: 'power1.out' })
        }
      }
    })
    
    // Refresh everything
    ScrollTrigger.refresh()
    
  }, 100)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (scrollTrigger) scrollTrigger.kill()
  if (scrollTriggerParallax) scrollTriggerParallax.kill()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <section class="content-section">
    <!-- Animated background particles -->
    <div class="particles-container">
      <div v-for="i in 60" :key="i" class="particle" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 2}px`,
        height: `${Math.random() * 10 + 2}px`,
        animationDuration: `${Math.random() * 6 + 2}s`,
        animationDelay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.6 + 0.1
      }"></div>
    </div>

    <!-- Decorative gradient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="orb orb-4"></div>
    <div class="orb orb-5"></div>

    <!-- Floating elements - MORE AGGRESSIVE -->
    <div class="floating-leaf leaf-1">🍃</div>
    <div class="floating-leaf leaf-2">🌿</div>
    <div class="floating-leaf leaf-3">🌱</div>
    <div class="floating-leaf leaf-4">🍂</div>
    <div class="floating-leaf leaf-5">🌻</div>
    <div class="floating-leaf leaf-6">🌸</div>
    <div class="floating-leaf leaf-7">💚</div>
    <div class="floating-leaf leaf-8">⚡</div>

    <div class="content-wrapper">
      <!-- Main Title - flies from RIGHT -->
      <h2 class="section-title">
        <span class="title-gradient">Pridruži se akciji</span>
      </h2>

      <!-- Description - flies from RIGHT -->
      <p class="section-description">
        Organizujemo čišćenje prirode, sadnju drveća i okupljanje ljudi koji žele da naprave promenu.
        <span class="highlight">Svaka mala akcija donosi veliku promenu.</span>
      </p>

      <!-- Logo - DROPS from TOP -->
      <img src="/akatsukiLogo.png" alt="Akatsuki Logo" class="section-logo" />

      <!-- CTA Button - RISES from BOTTOM -->
      <button class="cta-button" @click="$router.push('/events')">
        <span class="button-text">Pogledaj događaje</span>
        <svg class="button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Decorative line -->
      <div class="decorative-line"></div>
    </div>
  </section>
</template>

<style scoped>
.content-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A1A0F 0%, #1A3A2A 50%, #0D2818 100%);
  color: white;
  overflow: hidden !important; /* Changed from overflow-x/overflow-y */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
  margin: 0;
  padding: 0;
  /* Remove any blur at bottom */
  filter: none !important;
  backdrop-filter: none !important;
  /* Hide scrollbar completely */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

/* Hide scrollbar for Webkit browsers (Chrome, Safari, Opera) */
.content-section::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}

/* Ensure no blur at bottom of section */
.content-section::after {
  display: none;
}

/* Section Logo - DROPS from TOP */
.section-logo {
  display: block;
  margin: 20px auto;
  height: 280px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 5px 25px rgba(0,0,0,0.4));
  animation: logoPulse 3s ease-in-out infinite;
  position: relative;
  z-index: 10;
}

@keyframes logoPulse {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 5px 25px rgba(34, 197, 94, 0.3));
  }
  50% { 
    transform: scale(1.02);
    filter: drop-shadow(0 8px 35px rgba(74, 222, 128, 0.5));
  }
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
  z-index: 0;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, #22c55e, #4ade80, #a78bfa);
  border-radius: 50%;
  pointer-events: none;
  animation: particleBlast 6s ease-in-out infinite;
}

@keyframes particleBlast {
  0%, 100% { 
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-40px) translateX(20px) rotate(180deg) scale(1.5);
    opacity: 0.6;
  }
}

/* Floating Leaves - MORE AGGRESSIVE */
.floating-leaf {
  position: absolute;
  font-size: 2.5rem;
  pointer-events: none;
  z-index: 0;
  animation: leafRage 15s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.3));
}

.leaf-1 { top: 5%; left: 3%; animation-delay: 0s; animation-duration: 12s; }
.leaf-2 { top: 80%; right: 5%; animation-delay: -2s; animation-duration: 18s; }
.leaf-3 { bottom: 10%; left: 8%; animation-delay: -5s; animation-duration: 14s; }
.leaf-4 { top: 45%; right: 10%; animation-delay: -3s; animation-duration: 20s; }
.leaf-5 { top: 85%; right: 20%; animation-delay: -1s; animation-duration: 16s; }
.leaf-6 { top: 15%; right: 25%; animation-delay: -7s; animation-duration: 22s; }
.leaf-7 { bottom: 30%; left: 15%; animation-delay: -4s; animation-duration: 13s; }
.leaf-8 { top: 60%; right: 35%; animation-delay: -6s; animation-duration: 19s; }

@keyframes leafRage {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.1;
  }
  25% {
    transform: translate(60px, -50px) rotate(180deg) scale(1.2);
    opacity: 0.2;
  }
  50% { 
    transform: translate(-40px, 40px) rotate(360deg) scale(0.8);
    opacity: 0.15;
  }
  75% {
    transform: translate(30px, -30px) rotate(540deg) scale(1.1);
    opacity: 0.2;
  }
}

/* Decorative Orbs - MORE DRAMATIC */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
}

.orb-1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, #22c55e, #16a34a, transparent);
  top: -250px;
  right: -200px;
}

.orb-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #4ade80, #22c55e, transparent);
  bottom: -300px;
  left: -250px;
}

.orb-3 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #16a34a, #059669, transparent);
  top: 50%;
  left: 15%;
}

.orb-4 {
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, #a78bfa, #8b5cf6, transparent);
  bottom: 25%;
  right: 10%;
}

.orb-5 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #fbbf24, #f59e0b, transparent);
  top: 30%;
  right: 30%;
  opacity: 0.1;
}

/* Content Wrapper - SLIDES from LEFT */
.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 850px;
  width: 90%;
  margin: 40px auto;
  text-align: center;
  padding: 50px 40px;
  background: rgba(10, 26, 15, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 60px;
  border: 2px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5);
  opacity: 0;
}

/* Title - flies from RIGHT */
.section-title {
  font-size: clamp(2.2rem, 6vw, 3.8rem);
  font-weight: 900;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  opacity: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.title-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 30%, #22c55e 70%, #4ade80 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  animation: titleShine 3s ease-in-out infinite;
}

@keyframes titleShine {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

/* Description - flies from RIGHT */
.section-description {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.8;
  color: #CBD5E1;
  max-width: 650px;
  margin: 0 auto 20px;
  font-weight: 400;
  opacity: 0;
}

.highlight {
  display: block;
  margin-top: 15px;
  color: #4ade80;
  font-weight: 600;
  font-size: 1.05em;
  opacity: 0;
  text-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
}

/* CTA Button - RISES from BOTTOM */
.cta-button {
  position: relative;
  padding: 18px 42px;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
  letter-spacing: 1px;
  opacity: 0;
  margin-top: 20px;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 40px rgba(34, 197, 94, 0.6);
  gap: 20px;
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
  transform: translateX(6px);
}

/* Decorative Line */
.decorative-line {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #22c55e, #4ade80, #a78bfa, #22c55e, transparent);
  margin: 50px auto 0;
  border-radius: 3px;
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    width: 95%;
    padding: 40px 25px;
    margin: 20px auto;
  }
  
  .section-logo {
    height: 180px;
  }
  
  .cta-button {
    padding: 14px 32px;
    font-size: 1rem;
  }
  
  .orb-1, .orb-2 {
    width: 350px;
    height: 350px;
  }
  
  .floating-leaf {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 30px 20px;
  }
  
  .section-logo {
    height: 140px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-description {
    font-size: 0.9rem;
  }
  
  .cta-button {
    padding: 12px 24px;
    font-size: 0.9rem;
    gap: 10px;
  }
}
</style>