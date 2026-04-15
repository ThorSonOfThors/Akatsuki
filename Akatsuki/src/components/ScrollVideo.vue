<script setup>
import { onMounted, ref } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref(null)

const frameCount = 432
const images = new Array(frameCount)
const loadedMap = new Array(frameCount).fill(false)

let currentFrame = 0
let targetFrame = 0
let lastRenderedFrame = -1

const getFramePath = (i) =>
  `/frames/frame${String(i).padStart(4, '0')}.jpg`

// ✅ PARALLEL PRELOAD (FAST + RELIABLE)
const preloadImages = (callback) => {
  let loaded = 0

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = getFramePath(i + 1)

    img.onload = () => {
      loadedMap[i] = true
      loaded++

      // start early (don’t wait for all)
      if (loaded === 1) {
        callback()
      }
    }

    img.onerror = () => {
      console.warn("Failed frame:", i)
    }

    images[i] = img
  }
}

// ✅ SMOOTH INTERPOLATION
const lerp = (a, b, t) => a + (b - a) * t

// ✅ SAFE RENDER (fallback if frame missing)
const render = (index) => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  let safeIndex = index

  // 🔥 fallback to nearest loaded frame
  if (!loadedMap[safeIndex]) {
    for (let i = safeIndex; i >= 0; i--) {
      if (loadedMap[i]) {
        safeIndex = i
        break
      }
    }
  }

  if (safeIndex === lastRenderedFrame) return

  const img = images[safeIndex]
  if (!img) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  lastRenderedFrame = safeIndex
}

// ✅ ANIMATION LOOP
const animate = () => {
  currentFrame = lerp(currentFrame, targetFrame, 0.1)
  render(Math.floor(currentFrame))
  requestAnimationFrame(animate)
}

onMounted(() => {
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  preloadImages(() => {
    render(0)
    animate()

    // 🎯 SCROLL → FRAME
    gsap.to({}, {
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          targetFrame = self.progress * (frameCount - 1)
        }
      }
    })

    // 🎬 TEXT ANIMATIONS
    gsap.fromTo(".letter",
      { opacity: 0, y: 100, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.06,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "20% top",
          end: "40% top",
          scrub: 1,
        }
      }
    )

    gsap.fromTo(".subtitle",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "30% top",
          end: "45% top",
          scrub: 0.8,
        }
      }
    )

    gsap.to(".headline", {
      opacity: 0,
      y: -150,
      scale: 0.95,
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "50% top",
        end: "80% top",
        scrub: 1.2,
      }
    })

    gsap.to(".subtitle", {
      opacity: 0,
      y: -80,
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "60% top",
        end: "85% top",
        scrub: 1,
      }
    })

    gsap.to(".scroll-indicator", {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "60% top",
        end: "80% top",
        scrub: true,
      }
    })
  })
})
</script>

<template>
  <div class="scroll-container">
    <canvas ref="canvasRef"></canvas>
    
    <!-- OVERLAY WITH TEXT -->
    <div class="overlay">
      <h1 class="headline">
        <span v-for="(l, i) in 'MAKE A CHANGE'.split('')" 
              :key="i"
              class="letter">
          {{ l === ' ' ? '\u00A0' : l }}
        </span>
      </h1>
      

      <div class="scroll-indicator">
        <span>Scroll to explore</span>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
          <path d="M10 0L10 25M10 25L3 18M10 25L17 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <!-- GRADIENT OVERLAY -->
    <div class="gradient-overlay"></div>
    
    <!-- NOISE OVERLAY -->
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
.scroll-container {
  height: 300vh;
  background: black;
  position: relative;
}

canvas {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: block;
}

/* OVERLAY */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  z-index: 10;
  pointer-events: none;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
}

.headline {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.05em;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 30px rgba(0,0,0,0.3);
  background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform-origin: center;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
  opacity: 0.7;
  pointer-events: auto;
  cursor: pointer;
}

.scroll-indicator svg {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

/* GRADIENT OVERLAY */
.gradient-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(15,23,42,0.9), transparent);
  z-index: 5;
  pointer-events: none;
}

/* NOISE OVERLAY */
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-radial-gradient(circle at 20% 30%, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 2px, transparent 2px, transparent 4px);
  pointer-events: none;
  z-index: 3;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0F172A;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #22C55E, #4ADE80);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #16A34A;
}
</style>