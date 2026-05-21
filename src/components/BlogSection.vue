<template>
  <section id="blog" class="section" ref="sectionRef">
    <h2 class="section-title">博客文章</h2>
    <p class="section-subtitle">记录技术思考与生活感悟</p>
    <div class="blog-grid">
      <a v-for="(post, index) in posts" :key="post.title" :href="post.url"
         target="_blank" rel="noopener noreferrer" class="blog-card scroll-reveal"
         :data-delay="index + 1" ref="cardRefs">
        <div class="blog-meta">
          <span class="blog-date">{{ post.date }}</span>
          <span class="blog-category">{{ post.category }}</span>
        </div>
        <h3 class="blog-title">{{ post.title }}</h3>
        <p class="blog-excerpt">{{ post.excerpt }}</p>
        <span class="blog-read-more">
          阅读全文
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </a>
    </div>
    <div class="blog-more">
      <a href="https://blog.qbhx123.top" target="_blank" rel="noopener noreferrer" class="more-btn">
        访问博客查看更多
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTilt3D } from '../composables/useTilt3D'

const sectionRef = ref(null)
const cardRefs = ref([])
const posts = ref([])

useScrollReveal(sectionRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/blog?latest=true&limit=5')
    posts.value = await res.json()
  } catch {
    posts.value = []
  }

  setTimeout(() => {
    cardRefs.value.forEach((card) => {
      if (card) {
        useTilt3D({ value: card })
      }
    })
  }, 300)
})
</script>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.blog-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  padding: 28px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  will-change: transform;
}

.blog-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--accent);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.blog-date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.blog-category {
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 500;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent);
  transition: gap var(--transition);
}

.blog-card:hover .blog-read-more { gap: 10px; }

.blog-more { text-align: center; }

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

@media (max-width: 1024px) {
  .blog-grid { grid-template-columns: 1fr; }
}
</style>
