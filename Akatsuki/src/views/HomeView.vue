<script setup>
import { onMounted } from 'vue'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import ScrollVideo from '../components/ScrollVideo.vue'
import ContentSection from '../components/ContentSection.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.fromTo(".letter",
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "40% top",
        end: "60% top",
        scrub: true
      }
    }
  )

  gsap.to(".headline", {
    opacity: 0,
    y: -100,
    scrollTrigger: {
      trigger: ".hero",
      start: "50% top",
      end: "80% top",
      scrub: true
    }
  })
})
</script>

<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <ScrollVideo />

      <div class="overlay">
        <h1 class="headline">
          <span v-for="(l, i) in 'MAKE A CHANGE'.split('')" 
                :key="i"
                class="letter">
            {{ l === ' ' ? '\u00A0' : l }}
          </span>
        </h1>
        
       
      </div>

      <div class="gradient-overlay"></div>
      <div class="noise-overlay"></div>
    </section>

    <!-- CONTENT COMPONENT -->
    <ContentSection />

  </div>
</template>

<style scoped>
.hero {
  position: relative;
}

/* OVERLAY */
.overlay {
  position: fixed;
  top: 45%;
  width: 100%;
  text-align: center;
  color: white;
  z-index: 2;
  pointer-events: none;
}

.headline {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 6px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}


@media (max-width: 768px) {
  .headline {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 6px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

}

.letter {
  display: inline-block;
}

/* GRADIENT */
.gradient {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, transparent, #815f11);
  z-index: 1;
}

</style>