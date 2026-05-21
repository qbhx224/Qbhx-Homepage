<template>
  <section id="gallery" class="section" ref="sectionRef">
    <h2 class="section-title">相册</h2>
    <p class="section-subtitle">记录生活中的美好瞬间</p>
    <div class="gallery-grid">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="gallery-item scroll-reveal"
        :data-delay="(index % 4) + 1"
      >
        <img :src="photo.src" :alt="photo.title" loading="lazy" />
        <div class="gallery-overlay">
          <h4>{{ photo.title }}</h4>
          <p>{{ photo.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const photos = [
  {
    src: 'https://img.qbhx123.top/PicGo/background1.png',
    title: '默认背景',
    description: '主页默认背景图'
  },
  {
    src: 'https://img.qbhx123.top/PicGo/background2.png',
    title: '备用背景',
    description: '主页备用背景图'
  }
]
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

.gallery-overlay h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.gallery-overlay p {
  font-size: 0.85rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
