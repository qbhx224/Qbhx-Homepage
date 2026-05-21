<template>
  <section id="projects" class="section" ref="sectionRef">
    <h2 class="section-title">项目作品</h2>
    <p class="section-subtitle">我在 GitHub 上的开源项目</p>
    <div class="projects-grid">
      <div
        v-for="(project, index) in visibleProjects"
        :key="project.name"
        class="project-card scroll-reveal"
        :data-delay="(index % 4) + 1"
        ref="cardRefs"
      >
        <div class="project-header">
          <div class="project-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
          </div>
          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
            </a>
          </div>
        </div>
        <h3 class="project-name">
          {{ project.name }}
          <span v-if="project.fork" class="fork-badge">Fork</span>
        </h3>
        <p class="project-desc">{{ project.description || '暂无描述' }}</p>
        <div class="project-footer">
          <div class="project-lang" v-if="project.language">
            <span class="lang-dot"></span>
            {{ project.language }}
          </div>
          <div class="project-stats" v-if="project.stars > 0">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>{{ project.stars }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="view-more" v-if="projects.length > 4">
      <a href="https://github.com/qbhx224?tab=repositories" target="_blank" rel="noopener noreferrer" class="more-btn">
        查看更多项目
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTilt3D } from '../composables/useTilt3D'

const MAX_VISIBLE = 4
const sectionRef = ref(null)
const cardRefs = ref([])
const projects = ref([])

const visibleProjects = computed(() => projects.value.slice(0, MAX_VISIBLE))

useScrollReveal(sectionRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/projects')
    projects.value = await res.json()
  } catch {
    projects.value = []
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
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.project-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  padding: 28px;
  box-shadow: var(--shadow-sm);
  will-change: transform;
}

.project-card:hover {
  box-shadow: var(--shadow-md);
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.project-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--accent);
}

.project-links { display: flex; gap: 10px; }

.project-links a {
  color: var(--text-muted);
  transition: color var(--transition);
  display: flex;
}

.project-links a:hover { color: var(--accent); }

.project-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.fork-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 500;
}

.project-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-lang {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.lang-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.project-stats {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.project-stats svg { color: #f59e0b; }

.view-more { text-align: center; }

.more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition);
  box-shadow: 0 4px 14px rgba(71, 85, 105, 0.15);
}

.more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(71, 85, 105, 0.2);
  color: white;
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
}
</style>
