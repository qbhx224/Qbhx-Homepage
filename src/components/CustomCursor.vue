<template>
  <div class="custom-cursor" :class="{ hovering: isHovering }" ref="cursorRef">
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref(null)
const isHovering = ref(false)

const handleMouseMove = (e) => {
  if (!cursorRef.value) return
  cursorRef.value.style.left = `${e.clientX}px`
  cursorRef.value.style.top = `${e.clientY}px`
}

const handleMouseOver = (e) => {
  const target = e.target
  if (target.closest('a, button, .social-btn, .skill-tag, .tech-tag, .project-card, .blog-card, .tag')) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseover', handleMouseOver)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseover', handleMouseOver)
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
}

.cursor-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  width: 24px;
  height: 24px;
  border: 1.5px solid var(--accent);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
  opacity: 0.5;
}

.custom-cursor.hovering .cursor-ring {
  width: 40px;
  height: 40px;
  border-color: var(--accent-light);
  opacity: 0.8;
}

@media (hover: none) or (pointer: coarse) {
  .custom-cursor { display: none; }
}
</style>
