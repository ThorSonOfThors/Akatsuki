<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const router = useRouter()

const transitionName = ref('slide-left')

/* 🔥 ORDER MUST MATCH YOUR NAVIGATION */
const pagesOrder = [
  '/zabava',
  '/kontakt',
  '/o nama',
  '/mesto-okupljanja',
  '/home'
]

let prevIndex = pagesOrder.indexOf(route.path)

/* DIRECTION DETECTION */
watch(
  () => route.path,
  (newPath) => {
    const newIndex = pagesOrder.indexOf(newPath)

    if (newIndex > prevIndex) {
      transitionName.value = 'slide-left'
    } else {
      transitionName.value = 'slide-right'
    }

    prevIndex = newIndex
  }
)

/* =========================
   SWIPE NAVIGATION
========================= */

let startX = 0
let startY = 0
let endX = 0
let endY = 0

const minSwipeDistance = 80
const verticalLimit = 80

function handleTouchStart(e: TouchEvent) {
  const touch = e.touches?.[0]
  if (!touch) return

  startX = touch.clientX
  startY = touch.clientY
}

function handleTouchEnd(e: TouchEvent) {
  const touch = e.changedTouches?.[0]
  if (!touch) return

  endX = touch.clientX
  endY = touch.clientY

  handleSwipe()
}

function handleSwipe() {
  const diffX = endX - startX
  const diffY = Math.abs(endY - startY)

  if (diffY > verticalLimit) return
  if (Math.abs(diffX) < minSwipeDistance) return

  const currentIndex = pagesOrder.indexOf(route.path)
  if (currentIndex === -1) return

  // swipe left → next
  if (diffX < 0 && currentIndex < pagesOrder.length - 1) {
    router.push(pagesOrder[currentIndex + 1])
  }

  // swipe right → previous
  if (diffX > 0 && currentIndex > 0) {
    router.push(pagesOrder[currentIndex - 1])
  }
}
</script>

<template>
  <!-- 🔥 NAVBAR OVERLAY (NOT PART OF TRANSITION) -->
  <Navbar />

  <div
    class="page-wrapper"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <router-view v-slot="{ Component }">
      <!-- ❗ NO mode="out-in" -->
      <transition :name="transitionName">
        <div class="route-shell" :key="route.fullPath">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style>
/* RESET */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  height: 100%;
  background: rgb(2, 91, 20); /* 🔥 safety layer */
}

/* 🔥 NAVBAR (overlay, not affecting layout) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  z-index: 1000;
}

/* MAIN WRAPPER */
.page-wrapper {
  
  width: 100%;
 
}

/* 🔥 CRITICAL: FULLSCREEN LAYER */
.route-shell {
  position: absolute;
  
  width: 100%;
  
  background: rgb(2, 91, 20); /* prevents ANY bleed */
  
}

/* 🔥 TRANSITIONS */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.45s ease-in-out;
}

/* 🔥 STACKING (prevents gaps) */
.slide-left-enter-active,
.slide-right-enter-active {
  z-index: 2;
}

.slide-left-leave-active,
.slide-right-leave-active {
  z-index: 1;
}

/* FORWARD */
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* BACK */
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>