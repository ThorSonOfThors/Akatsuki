<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
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
let isMobile = false
let ctx = null
let rafId = null

// ✅ Frame path
const getFramePath = (i) =>
  `/frames/frame${String(i).padStart(4, '0')}.jpg`

// ✅ Mobile check
const checkMobile = () => {
  return window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// ✅ Viewport-safe sizing
const getViewportHeight = () =>
  window.visualViewport ? window.visualViewport.height : window.innerHeight

const setCanvasSize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()

  canvas.width = Math.round(rect.width)
  canvas.height = Math.round(rect.height)
}

// ✅ Preload
const preloadImages = (callback) => {
  let loaded = 0

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = getFramePath(i + 1)

    img.onload = () => {
      loadedMap[i] = true
      loaded++

      if (loaded === 1) callback()
    }

    images[i] = img
  }
}

// ✅ LERP
const lerp = (a, b, t) => a + (b - a) * t

// ✅ Dimensions (PIXEL SAFE)
const calculateDimensions = (img) => {
  const containerWidth = window.innerWidth
  const containerHeight = getViewportHeight()
  const imgAspect = img.width / img.height

  let drawWidth, drawHeight, offsetX, offsetY

  if (isMobile) {
    drawHeight = containerHeight
    drawWidth = containerHeight * imgAspect

    // 🔥 FIX: remove subpixel drift
    offsetX = Math.round((containerWidth - drawWidth) / 2)
    offsetY = 0
  } else {
    drawWidth = containerWidth
    drawHeight = containerHeight
    offsetX = 0
    offsetY = 0
  }

  return { drawWidth, drawHeight, offsetX, offsetY }
}

// ✅ Render
const render = (index) => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  let safeIndex = index

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

  const { drawWidth, drawHeight, offsetX, offsetY } = calculateDimensions(img)

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

  lastRenderedFrame = safeIndex
}

// ✅ Animation loop
const animate = () => {
  currentFrame = lerp(currentFrame, targetFrame, 0.1)
  render(Math.floor(currentFrame))
  rafId = requestAnimationFrame(animate)
}

// ✅ Resize
let resizeTimeout
const handleResize = () => {
  clearTimeout(resizeTimeout)

  resizeTimeout = setTimeout(() => {
    setCanvasSize()
    isMobile = checkMobile()
    render(Math.floor(currentFrame))
    ScrollTrigger.refresh()
  }, 50)
}

// ✅ CLEANUP (VERY IMPORTANT)
onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  window.removeEventListener('resize', handleResize)

  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', handleResize)
  }

  cancelAnimationFrame(rafId)
})

// ✅ INIT
onMounted(async () => {
  // 🔥 HARD RESET STATE
  currentFrame = 0
  targetFrame = 0
  lastRenderedFrame = -1

  ScrollTrigger.getAll().forEach(t => t.kill())

  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  isMobile = checkMobile()

  // 🔥 FORCE SCROLL RESET (CRITICAL)
  window.scrollTo(0, 0)

  await nextTick()

  setCanvasSize()

  preloadImages(async () => {
    await nextTick()

    setCanvasSize()

    // 🔥 FIRST PERFECT FRAME
    render(0)

    // 🔥 START LOOP AFTER FIRST FRAME
    animate()

    window.addEventListener('resize', handleResize)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    // 🎯 SCROLL → FRAME
    gsap.to({}, {
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetFrame = self.progress * (frameCount - 1)
        }
      }
    })

    // 🔥 FORCE FINAL SYNC AFTER GSAP INIT
    setTimeout(() => {
      setCanvasSize()
      render(0)
      
    }, 100)
  })
})
</script>

<template>
  <div class="scroll-container">
    <canvas ref="canvasRef"></canvas>
    
    <!-- OVERLAY WITH TEXT -->
    <div class="overlay">
      <h1 class="headline">
        <!-- Your headline text here -->
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
  height: 100dvh;
  display: block;
  object-fit: cover; /* Fallback for CSS */
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

/* Mobile optimizations */
@media (max-width: 768px) {
  .headline {
    gap: 0.03em;
    letter-spacing: 0.05em;
  }
  
  .subtitle {
    letter-spacing: 0.2em;
    margin-bottom: 2rem;
  }
  
  .scroll-indicator {
    bottom: 30px;
  }
  
  /* Improve performance on mobile */
  .noise-overlay {
    display: none; /* Optional: disable noise on mobile for better performance */
  }
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