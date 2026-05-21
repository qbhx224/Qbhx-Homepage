<template>
  <section id="github" class="section" ref="sectionRef">
    <h2 class="section-title">GitHub 数据</h2>
    <p class="section-subtitle">我的开源贡献概览</p>
    <div class="github-grid">
      <div v-if="loading" v-for="i in 4" :key="i" class="github-card glass-card skeleton">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
      <template v-else>
        <div class="github-card glass-card scroll-reveal" data-delay="1">
          <div class="github-stat-value">{{ stats.repos }}</div>
          <div class="github-stat-label">仓库数</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="github-icon"><path d="M3 3h18v18H3zM3 9h18M9 21V9"/></svg>
        </div>
        <div class="github-card glass-card scroll-reveal" data-delay="2">
          <div class="github-stat-value">{{ stats.followers }}</div>
          <div class="github-stat-label">粉丝</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="github-icon"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div class="github-card glass-card scroll-reveal" data-delay="3">
          <div class="github-stat-value">{{ stats.following }}</div>
          <div class="github-stat-label">关注</div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="github-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="github-card glass-card scroll-reveal" data-delay="4">
          <div class="github-stat-value">{{ stats.stars }}</div>
          <div class="github-stat-label">总 Star</div>
          <svg viewBox="0 0 24 24" fill="currentColor" class="github-icon star-icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const loading = ref(true)
const stats = ref({ repos: 0, followers: 0, following: 0, stars: 0 })

const CACHE_KEY = 'github_stats_cache'
const CACHE_TTL = 30 * 60 * 1000

const revealCards = async () => {
  await nextTick()
  if (sectionRef.value) {
    sectionRef.value.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.add('is-revealed')
    })
  }
}

onMounted(async () => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_TTL) {
      stats.value = data
      loading.value = false
      revealCards()
      return
    }
  }

  try {
    const res = await fetch('https://api.github.com/users/qbhx224')
    const user = await res.json()
    stats.value = {
      repos: user.public_repos || 0,
      followers: user.followers || 0,
      following: user.following || 0,
      stars: 0
    }

    const reposRes = await fetch('https://api.github.com/users/qbhx224/repos?per_page=100')
    const repos = await reposRes.json()
    stats.value.stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats.value, timestamp: Date.now() }))
  } catch {
    stats.value = { repos: 4, followers: 0, following: 0, stars: 1 }
  } finally {
    loading.value = false
    revealCards()
  }
})
</script>

<style scoped>
.github-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.github-card {
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.github-stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.github-stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.github-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  opacity: 0.4;
}

.star-icon {
  color: #f59e0b;
  opacity: 0.6;
}

.skeleton {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.skeleton-line {
  width: 60%;
  height: 20px;
  background: var(--border);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line.short {
  width: 40%;
  height: 14px;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@media (max-width: 768px) {
  .github-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .github-grid { grid-template-columns: 1fr; }
}
</style>
