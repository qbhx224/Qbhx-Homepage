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
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const timeline = [
  {
    year: '2023',
    title: '入学安徽商贸职业技术学院',
    description: '开始计算机相关专业学习，对编程产生浓厚兴趣。'
  },
  {
    year: '2024',
    title: '学习 Swift 与 iOS 开发',
    description: '系统学习 Swift 语言和 iOS 应用开发，完成多个课程项目。'
  },
  {
    year: '2024',
    title: '接触 Android 开发',
    description: '学习 Kotlin 和 Android 平台开发，完成 LintFile 文件管理器项目。'
  },
  {
    year: '2025',
    title: '全栈探索',
    description: '学习 Docker、Linux 运维，搭建个人博客和云服务器环境。'
  },
  {
    year: '2026',
    title: '持续学习中',
    description: '深入学习前端技术（Vue.js），开发个人主页，探索更多可能性。'
  }
]
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
