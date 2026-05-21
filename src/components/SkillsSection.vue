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
          <span class="card-icon" v-html="skillIcons[category.iconType]"></span>
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
import { skillIcons } from '../utils/icons'

const sectionRef = ref(null)
const cardRefs = ref([])
const skills = ref([])

useScrollReveal(sectionRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/skills')
    skills.value = await res.json()
  } catch {
    skills.value = []
  }

  setTimeout(() => {
    cardRefs.value.forEach((card) => {
      if (card) {
        useTilt3D({ value: card })
      }
    })
  }, 100)
})
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
