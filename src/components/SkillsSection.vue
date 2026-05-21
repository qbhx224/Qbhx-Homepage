<template>
  <section id="skills" class="section" ref="sectionRef">
    <h2 class="section-title">技能栈</h2>
    <p class="section-subtitle">我日常使用的技术和工具</p>
    <div class="skills-grid">
      <div
        v-for="(category, index) in skills"
        :key="category.name"
        class="skill-card scroll-reveal"
        :data-delay="index + 1"
        ref="cardRefs"
      >
        <div class="card-header">
          <span class="card-icon" v-html="category.icon"></span>
          <h3>{{ category.name }}</h3>
        </div>
        <div class="skill-tags">
          <span v-for="skill in category.items" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTilt3D } from '../composables/useTilt3D'

const sectionRef = ref(null)
const cardRefs = ref([])

useScrollReveal(sectionRef)

onMounted(() => {
  cardRefs.value.forEach((card) => {
    if (card) {
      useScrollReveal({ value: card })
      useTilt3D({ value: card })
    }
  })
})

const skills = [
  {
    name: '前端开发',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Typecho']
  },
  {
    name: '移动开发',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
    items: ['Swift', 'iOS Development', 'Kotlin', 'Android', '微信小程序']
  },
  {
    name: '后端与运维',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
    items: ['Docker', 'Linux', 'Nginx', '1Panel', 'Cloudflare']
  },
  {
    name: '工具与平台',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    items: ['Git', 'VS Code', 'FinalShell', 'GitHub', 'Vite']
  },
]
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.skill-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  will-change: transform;
}

.skill-card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-bg);
  border-radius: 10px;
  color: var(--accent);
  flex-shrink: 0;
}

.card-icon :deep(svg) { width: 20px; height: 20px; }

.card-header h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.skill-tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  transition: all var(--transition);
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
}

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
