<template>
  <section id="about" class="hero" ref="heroRef">
    <div class="hero-bg" ref="heroBgRef"></div>
    <div class="hero-content" v-if="hero">
      <div class="avatar-card scroll-reveal" data-delay="1">
        <img :src="hero.avatar" :alt="hero.name" class="avatar-img" />
      </div>
      <h1 class="hero-name scroll-reveal" data-delay="2">{{ hero.name }}</h1>
      <p class="hero-bio scroll-reveal" :class="{ 'no-cursor': typingComplete }" data-delay="3">{{ displayBio }}</p>
      <div class="hero-meta scroll-reveal" data-delay="4">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {{ hero.location }}
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>
          {{ hero.school }}
        </span>
      </div>
      <div class="hero-tags scroll-reveal" data-delay="5">
        <span v-for="tag in hero.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="social-links scroll-reveal" data-delay="6">
        <a v-for="link in hero.socialLinks" :key="link.name" :href="link.url"
           target="_blank" rel="noopener noreferrer" class="social-btn">
          <span v-html="getSocialIcon(link.iconType)"></span>
          <span>{{ link.name }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useParallax } from '../composables/useParallax'
import { socialIcons } from '../utils/icons'

const heroRef = ref(null)
const heroBgRef = ref(null)
const displayBio = ref('')
const typingComplete = ref(false)
const hero = ref(null)

const getSocialIcon = (type) => socialIcons[type] || ''

useScrollReveal(heroRef)
useParallax(heroRef)

onMounted(async () => {
  try {
    const res = await fetch('/api/hero')
    hero.value = await res.json()
  } catch {
    hero.value = {
      name: '千杯寒雪',
      avatar: 'https://img.qbhx123.top/qbhxlogo.png',
      bio: '莫见乎隐，莫显乎微，故君子慎其独也',
      location: '安徽芜湖',
      school: '安徽商贸职业技术学院',
      tags: ['Student', 'Developer', 'Mobile & Web'],
      socialLinks: [
        { name: 'GitHub', url: 'https://github.com/qbhx224', iconType: 'github' },
        { name: '博客', url: 'https://blog.qbhx123.top', iconType: 'blog' },
        { name: 'Bilibili', url: 'https://space.bilibili.com/383024178', iconType: 'bilibili' },
        { name: 'Email', url: 'mailto:contact@qbhx123.top', iconType: 'email' }
      ]
    }
  }

  setTimeout(() => {
    if (heroRef.value) {
      heroRef.value.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-revealed')
      })
    }
  }, 300)

  const bioText = hero.value?.bio || ''
  let i = 0
  const timer = setInterval(() => {
    if (i < bioText.length) {
      displayBio.value += bioText[i]
      i++
    } else {
      clearInterval(timer)
      typingComplete.value = true
    }
  }, 80)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 80px 24px 48px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, var(--hero-gradient-1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--hero-gradient-2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, var(--hero-gradient-3) 0%, transparent 50%);
  z-index: 0;
  transform: translate(var(--px, 0), var(--py, 0));
  transition: transform 0.4s ease;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.avatar-card {
  margin: 0 auto 28px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  padding: 3px;
  transition: transform 0.3s ease;
}

.avatar-card:hover {
  transform: scale(1.05);
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-card);
}

.hero-name {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bio {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
  max-width: 500px;
  font-style: italic;
  min-height: 1.6em;
}

.hero-bio::after {
  content: '|';
  animation: blink 1s step-end infinite;
  margin-left: 2px;
  color: var(--accent);
}

.hero-bio.no-cursor::after {
  display: none;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-meta {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-item svg {
  flex-shrink: 0;
}

.hero-tags {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.social-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 768px) {
  .hero-name { font-size: 2.2rem; }
  .hero-bio { font-size: 1rem; }
  .avatar-card { width: 100px; height: 100px; }
  .hero-meta { gap: 16px; }
  .social-btn span { display: none; }
  .social-btn { padding: 10px; }
}
</style>
