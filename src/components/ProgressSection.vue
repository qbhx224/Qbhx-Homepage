<template>
  <section class="progress-section" ref="sectionRef">
    <div class="progress-grid">
      <div v-for="(item, index) in progressItems" :key="item.label" class="progress-card glass-card scroll-reveal" :data-delay="index + 1">
        <div class="progress-header">
          <span class="progress-icon" v-html="item.icon"></span>
          <span class="progress-label">{{ item.label }}</span>
          <span class="progress-value">{{ item.value }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: item.value + '%', background: item.color }"></div>
        </div>
        <div class="progress-detail">{{ item.detail }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const progressItems = ref([])
let timer = null

const updateProgress = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  // 今日进度
  const todaySeconds = hour * 3600 + minute * 60 + second
  const todayPct = (todaySeconds / 86400 * 100).toFixed(1)
  const todayElapsed = `${hour}小时${minute}分`

  // 本周进度 (周日=0)
  const dayOfWeek = now.getDay()
  const weekSeconds = dayOfWeek * 86400 + todaySeconds
  const weekPct = (weekSeconds / 604800 * 100).toFixed(1)
  const weekElapsed = `${dayOfWeek}天${hour}小时`

  // 本月进度
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthSeconds = (day - 1) * 86400 + todaySeconds
  const monthTotal = daysInMonth * 86400
  const monthPct = (monthSeconds / monthTotal * 100).toFixed(1)
  const monthElapsed = `${day - 1}天${hour}小时`

  // 今年进度
  const startOfYear = new Date(year, 0, 1)
  const endOfYear = new Date(year + 1, 0, 1)
  const yearTotal = endOfYear - startOfYear
  const yearElapsed = now - startOfYear
  const yearPct = (yearElapsed / yearTotal * 100).toFixed(1)
  const yearDays = Math.floor(yearElapsed / 86400000)

  progressItems.value = [
    {
      label: '今日',
      value: todayPct,
      detail: `已过 ${todayElapsed}`,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      color: 'linear-gradient(90deg, #f59e0b, #ef4444)'
    },
    {
      label: '本周',
      value: weekPct,
      detail: `已过 ${weekElapsed}`,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
      color: 'linear-gradient(90deg, #8b5cf6, #6366f1)'
    },
    {
      label: '本月',
      value: monthPct,
      detail: `已过 ${monthElapsed}`,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
      color: 'linear-gradient(90deg, #06b6d4, #3b82f6)'
    },
    {
      label: '今年',
      value: yearPct,
      detail: `已过 ${yearDays} 天`,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
      color: 'linear-gradient(90deg, #10b981, #059669)'
    }
  ]
}

onMounted(() => {
  updateProgress()
  timer = setInterval(updateProgress, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.progress-section {
  padding: 0 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.progress-card {
  padding: 20px;
}

.progress-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.progress-icon {
  width: 20px;
  height: 20px;
  color: var(--accent);
  display: flex;
}

.progress-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.progress-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  flex: 1;
}

.progress-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  height: 6px;
  background: var(--bg-primary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
}

.progress-detail {
  font-size: 0.8rem;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .progress-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .progress-grid { grid-template-columns: 1fr; }
}
</style>
