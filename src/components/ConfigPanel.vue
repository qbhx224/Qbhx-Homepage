<template>
  <div class="config-overlay" @click.self="$emit('close')">
    <div class="config-panel glass-card">
      <div class="config-header">
        <h3>设置</h3>
        <button class="config-close" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="config-body">
        <div class="config-group">
          <label class="config-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            天气城市
          </label>
          <div class="config-input-wrap">
            <input
              v-model="city"
              type="text"
              class="config-input"
              placeholder="例如: Wuhu, Beijing, Tokyo"
            />
            <span class="config-hint">使用英文城市名，修改后自动保存</span>
          </div>
        </div>
        <div class="config-group">
          <label class="config-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            背景图片
          </label>
          <div class="config-bg-options">
            <button
              v-for="bg in backgrounds"
              :key="bg.name"
              class="config-bg-btn"
              :class="{ active: currentBg === bg.url }"
              @click="selectBg(bg.url)"
            >
              <img :src="bg.thumb" :alt="bg.name" />
              <span>{{ bg.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

defineEmits(['close'])

const backgrounds = [
  { name: '背景一', url: 'https://img.qbhx123.top/PicGo/background1.png', thumb: 'https://img.qbhx123.top/PicGo/background1.png' },
  { name: '背景二', url: 'https://img.qbhx123.top/PicGo/background3.webp', thumb: 'https://img.qbhx123.top/PicGo/background3.webp' },
]

const city = ref(localStorage.getItem('config_city') || 'Wuhu')
const currentBg = ref(localStorage.getItem('config_bg') || backgrounds[0].url)

watch(city, (val) => {
  localStorage.setItem('config_city', val)
  window.dispatchEvent(new CustomEvent('config-changed', { detail: { key: 'city', value: val } }))
})

const selectBg = (url) => {
  currentBg.value = url
  localStorage.setItem('config_bg', url)
  const bgEl = document.querySelector('.page-bg')
  if (bgEl) bgEl.style.backgroundImage = `url(${url})`
}
</script>

<style scoped>
.config-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.config-panel {
  width: 360px;
  max-width: 90vw;
  height: 100%;
  padding: 0;
  border-radius: 0;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.config-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.config-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 6px;
  transition: all var(--transition);
}

.config-close:hover {
  color: var(--text-primary);
  background: var(--accent-bg);
}

.config-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.config-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.config-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.config-label svg {
  color: var(--accent);
  flex-shrink: 0;
}

.config-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.config-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color var(--transition);
}

.config-input:focus {
  border-color: var(--accent);
}

.config-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.config-bg-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.config-bg-btn {
  position: relative;
  border: 2px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: all var(--transition);
}

.config-bg-btn img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  display: block;
}

.config-bg-btn span {
  display: block;
  padding: 6px 8px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.config-bg-btn.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}

.config-bg-btn:hover {
  border-color: var(--accent-light);
}
</style>
