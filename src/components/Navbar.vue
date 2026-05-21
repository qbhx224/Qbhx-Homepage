<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo" @click.prevent="onLogoClick">
        <span class="logo-text">千杯寒雪の主页</span>
      </a>
      <div class="nav-links" :class="{ open: menuOpen }">
        <a v-for="item in navItems" :key="item.id" :href="'#' + item.id"
           class="nav-link" :class="{ active: activeSection === item.id }"
           @click="menuOpen = false">
          {{ item.label }}
        </a>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? '切换浅色模式' : '切换深色模式'">
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { id: 'about', label: '关于我' },
  { id: 'timeline', label: '经历' },
  { id: 'github', label: 'GitHub' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'gallery', label: '相册' },
  { id: 'blog', label: '博客' },
]

const activeSection = ref('about')
const menuOpen = ref(false)
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const emit = defineEmits(['logo-click'])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  menuOpen.value = false
}

const onLogoClick = () => {
  scrollToTop()
  emit('logo-click')
}

const handleScroll = () => {
  const sections = navItems.map(item => document.getElementById(item.id))
  const scrollY = window.scrollY + 120
  for (let i = sections.length - 1; i >= 0; i--) {
    if (sections[i] && sections[i].offsetTop <= scrollY) {
      activeSection.value = navItems[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo { text-decoration: none; }

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.5px;
}

.nav-links { display: flex; gap: 8px; }

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent);
  background: var(--accent-bg);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-bg);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  position: relative;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s;
  position: absolute;
  left: 6px;
}

.menu-toggle span { top: 15px; }
.menu-toggle span::before { content: ''; top: -6px; }
.menu-toggle span::after { content: ''; top: 6px; }
.menu-toggle span.open { background: transparent; }
.menu-toggle span.open::before { top: 0; transform: rotate(45deg); }
.menu-toggle span.open::after { top: 0; transform: rotate(-45deg); }

@media (max-width: 768px) {
  .menu-toggle { display: block; }
  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid var(--border);
    gap: 4px;
  }
  .nav-links.open { display: flex; }
  .nav-link { padding: 12px 16px; }
}
</style>
