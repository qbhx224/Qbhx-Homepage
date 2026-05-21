<template>
  <section id="timeline" class="section" ref="sectionRef">
    <h2 class="section-title">个人经历</h2>
    <p class="section-subtitle">我的成长历程</p>
    <div class="timeline">
      <div
        v-for="(item, index) in timeline"
        :key="item.year"
        class="timeline-item scroll-reveal"
        :data-delay="index + 1"
        :class="{ 'right': index % 2 === 1 }"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-card glass-card">
          <span class="timeline-year">{{ item.year }}</span>
          <h3 class="timeline-title">{{ item.title }}</h3>
          <p class="timeline-desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
const timeline = ref([])

useScrollReveal(sectionRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/timeline')
    timeline.value = await res.json()
  } catch {
    timeline.value = []
  }
})
</script>

<style scoped>
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px 40px;
}

.timeline-item.right {
  margin-left: 50%;
}

.timeline-dot {
  position: absolute;
  right: -8px;
  top: 8px;
  width: 16px;
  height: 16px;
  background: var(--accent);
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  z-index: 1;
}

.timeline-item.right .timeline-dot {
  right: auto;
  left: -8px;
}

.timeline-card {
  padding: 20px;
}

.timeline-year {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
  display: block;
}

.timeline-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.timeline-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    padding: 0 0 32px 50px;
  }

  .timeline-item.right {
    margin-left: 0;
  }

  .timeline-dot {
    left: 12px;
    right: auto;
  }

  .timeline-item.right .timeline-dot {
    left: 12px;
  }
}
</style>
