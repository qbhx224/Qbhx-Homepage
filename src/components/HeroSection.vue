<template>
  <section id="about" class="hero" ref="heroRef">
    <div class="hero-bg" ref="heroBgRef"></div>
    <div class="hero-content">
      <div class="avatar-card scroll-reveal" data-delay="1">
        <img src="https://img.qbhx123.top/qbhxlogo.png" alt="千杯寒雪" class="avatar-img" />
      </div>
      <h1 class="hero-name scroll-reveal" data-delay="2">千杯寒雪</h1>
      <p class="hero-bio scroll-reveal" :class="{ 'no-cursor': typingComplete }" data-delay="3">{{ displayBio }}</p>
      <div class="hero-meta scroll-reveal" data-delay="4">
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          安徽芜湖
        </span>
        <span class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>
          安徽商贸职业技术学院
        </span>
      </div>
      <div class="hero-tags scroll-reveal" data-delay="5">
        <span class="tag">Student</span>
        <span class="tag">Developer</span>
        <span class="tag">Mobile & Web</span>
      </div>
      <div class="social-links scroll-reveal" data-delay="6">
        <a href="https://github.com/qbhx224" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
          <span>GitHub</span>
        </a>
        <a href="https://blog.qbhx123.top" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          <span>博客</span>
        </a>
        <a href="https://space.bilibili.com/383024178" target="_blank" rel="noopener noreferrer" class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.124.929.373.258.258.382.56.382.907s-.124.649-.382.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
          <span>Bilibili</span>
        </a>
        <a href="mailto:contact@qbhx123.top" class="social-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span>Email</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useParallax } from '../composables/useParallax'

const heroRef = ref(null)
const heroBgRef = ref(null)
const displayBio = ref('')
const typingComplete = ref(false)
const bioText = '莫见乎隐，莫显乎微，故君子慎其独也'

useScrollReveal(heroRef)
useParallax(heroRef)

onMounted(() => {
  // Trigger scroll reveal for all children after a small delay
  setTimeout(() => {
    if (heroRef.value) {
      heroRef.value.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-revealed')
      })
    }
  }, 300)

  // Typing effect
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
