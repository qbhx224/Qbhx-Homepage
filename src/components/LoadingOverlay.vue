<template>
  <div class="loading-overlay" :class="{ out: done }" v-if="visible">
    <!-- 背景图层 -->
    <div class="loading-bg" :class="{ zoom: started }">
      <div class="loading-bg-inner" :style="{ backgroundImage: `url(${bgImage})` }"></div>
      <div class="loading-bg-overlay"></div>
    </div>

    <!-- 中心内容 -->
    <div class="loading-center">
      <div class="loading-avatar">
        <img src="https://img.qbhx123.top/qbhxlogo.png" alt="千杯寒雪" />
      </div>
      <div class="loading-title">千杯寒雪</div>
      <div class="loading-subtitle">莫见乎隐，莫显乎微，故君子慎其独也</div>
      <div class="loading-bar-wrap">
        <div class="loading-bar">
          <div class="loading-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="loading-percent">{{ Math.round(progress) }}%</div>
      </div>
    </div>

    <!-- 底部装饰线 -->
    <div class="loading-deco">
      <div class="deco-line" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['complete'])
const visible = ref(true)
const done = ref(false)
const started = ref(false)
const progress = ref(0)

const backgrounds = [
  'https://img.qbhx123.top/PicGo/background1.png',
  'https://img.qbhx123.top/PicGo/background3.webp',
]
const bgImage = backgrounds[Math.floor(Math.random() * backgrounds.length)]

onMounted(() => {
  requestAnimationFrame(() => { started.value = true })

  const interval = setInterval(() => {
    const remaining = 100 - progress.value
    progress.value += Math.random() * Math.min(remaining * 0.15, 12) + 2
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        done.value = true
        setTimeout(() => {
          visible.value = false
          emit('complete')
        }, 700)
      }, 300)
    }
  }, 80)
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-overlay.out {
  opacity: 0;
  transform: scale(1.08);
}

/* 背景图 */
.loading-bg {
  position: absolute;
  inset: 0;
}

.loading-bg-inner {
  position: absolute;
  inset: -20px;
  background-size: cover;
  background-position: center;
  transform: scale(1.15);
  transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: blur(2px) brightness(0.4);
}

.loading-bg.zoom .loading-bg-inner {
  transform: scale(1);
}

.loading-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(51, 65, 85, 0.6) 0%,
    rgba(15, 23, 42, 0.75) 50%,
    rgba(100, 116, 139, 0.5) 100%
  );
}

/* 中心内容 */
.loading-center {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.loading-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 40px rgba(71, 85, 105, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

.loading-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(71, 85, 105, 0.3); }
  50% { box-shadow: 0 0 40px rgba(100, 116, 139, 0.5); }
}

.loading-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 4px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.loading-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  letter-spacing: 1px;
}

.loading-bar-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
}

.loading-bar {
  width: 220px;
  height: 3px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.loading-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-light), white);
  border-radius: 2px;
  transition: width 0.08s ease;
  box-shadow: 0 0 8px rgba(100, 116, 139, 0.5);
}

.loading-percent {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-variant-numeric: tabular-nums;
  min-width: 32px;
}

/* 底部装饰线 */
.loading-deco {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
}

.deco-line {
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--accent-light), transparent);
  transition: width 0.08s ease;
}
</style>
