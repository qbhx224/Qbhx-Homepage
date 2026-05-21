<template>
  <section class="hitokoto-section" ref="sectionRef">
    <div class="hitokoto-card glass-card scroll-reveal">
      <div class="hitokoto-header">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" class="quote-icon"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
        <span class="hitokoto-label">一言</span>
        <button class="refresh-btn" @click="fetchHitokoto" :disabled="loading" title="刷新">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" :class="{ spinning: loading }"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
      </div>
      <div class="hitokoto-body">
        <p class="hitokoto-text" :class="{ loading: loading }">
          {{ hitokoto.text || '加载中...' }}
        </p>
        <p class="hitokoto-from" v-if="hitokoto.from">
          —— {{ hitokoto.from }}{{ hitokoto.from_who ? ' · ' + hitokoto.from_who : '' }}
        </p>
      </div>
      <div class="hitokoto-footer">
        <span class="hitokoto-type" v-if="hitokoto.type">{{ hitokoto.type }}</span>
        <div class="hitokoto-actions">
          <button class="action-btn" @click="copyText" title="复制">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span>{{ copied ? '已复制' : '复制' }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const hitokoto = ref({ text: '', from: '', from_who: '', type: '' })
const loading = ref(false)
const copied = ref(false)

const typeMap = {
  a: '动画', b: '漫画', c: '游戏', d: '文学', e: '原创',
  f: '来自网络', g: '其他', h: '影视', i: '诗词', j: '网易云',
  k: '哲学', l: '抖机灵'
}

const fetchHitokoto = async () => {
  loading.value = true
  try {
    const res = await fetch('https://v1.hitokoto.cn/')
    const data = await res.json()
    hitokoto.value = {
      text: data.hitokoto,
      from: data.from,
      from_who: data.from_who,
      type: typeMap[data.type] || data.type
    }
  } catch {
    hitokoto.value = { text: '生活不止眼前的苟且，还有诗和远方。', from: '高晓松', from_who: '', type: '文学' }
  } finally {
    loading.value = false
  }
}

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(hitokoto.value.text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}

onMounted(fetchHitokoto)
</script>

<style scoped>
.hitokoto-section {
  padding: 0 24px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.hitokoto-card {
  padding: 28px 32px;
  max-width: 700px;
  margin: 0 auto;
}

.hitokoto-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--accent);
}

.hitokoto-label {
  font-weight: 600;
  font-size: 0.95rem;
  flex: 1;
}

.refresh-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 6px;
  display: flex;
  transition: all var(--transition);
}

.refresh-btn:hover {
  color: var(--accent);
  background: var(--accent-bg);
}

.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hitokoto-body {
  margin-bottom: 16px;
}

.hitokoto-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-primary);
  font-style: italic;
  transition: opacity var(--transition);
}

.hitokoto-text.loading {
  opacity: 0.5;
}

.hitokoto-from {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: right;
}

.hitokoto-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.hitokoto-type {
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 500;
}

.hitokoto-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  color: var(--text-muted);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  transition: all var(--transition);
}

.action-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-bg);
}

@media (max-width: 768px) {
  .hitokoto-section { padding: 0 16px 32px; }
  .hitokoto-card { padding: 20px; }
  .hitokoto-text { font-size: 1rem; }
}
</style>
