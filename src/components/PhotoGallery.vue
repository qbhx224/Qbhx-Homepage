<template>
  <section id="gallery" class="section" ref="sectionRef">
    <h2 class="section-title">相册</h2>
    <p class="section-subtitle">记录生活中的美好瞬间</p>
    <div class="gallery-grid">
      <div
        v-for="(photo, index) in visiblePhotos"
        :key="index"
        class="gallery-item scroll-reveal"
        :data-delay="(index % 3) + 1"
      >
        <img :src="photo.src" :alt="photo.title" loading="lazy" />
        <div class="gallery-overlay">
          <h4>{{ photo.title }}</h4>
          <p>{{ photo.description }}</p>
        </div>
      </div>
    </div>
    <div class="gallery-more" v-if="photos.length > 3">
      <button class="more-btn" @click="showAll = !showAll">
        {{ showAll ? '收起' : '查看更多照片' }}
        <svg v-if="!showAll" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 9l6 6 6-6"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const MAX_VISIBLE = 3
const sectionRef = ref(null)
const photos = ref([])
const showAll = ref(false)

const visiblePhotos = computed(() => {
  return showAll.value ? photos.value : photos.value.slice(0, MAX_VISIBLE)
})

useScrollReveal(sectionRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/photos')
    photos.value = await res.json()
  } catch {
    photos.value = []
  }
})
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
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

.gallery-more { text-align: center; }

.more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.more-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
