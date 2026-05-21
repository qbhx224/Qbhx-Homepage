<template>
  <div class="scroll-progress" :style="{ transform: `scaleX(${scrollPercent / 100})` }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollPercent = ref(0)

const updateScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollPercent.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  transform-origin: left;
  z-index: 9999;
  transition: transform 0.1s linear;
}
</style>
