<script setup>
import { ref, onMounted } from 'vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import ScrollProgressBar from './components/ScrollProgressBar.vue'
import Navbar from './components/Navbar.vue'
import ClockWeather from './components/ClockWeather.vue'
import HeroSection from './components/HeroSection.vue'
import HitokotoSection from './components/HitokotoSection.vue'
import ProgressSection from './components/ProgressSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import GitHubStats from './components/GitHubStats.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import BlogSection from './components/BlogSection.vue'
import FooterSection from './components/FooterSection.vue'
import ConfigPanel from './components/ConfigPanel.vue'
import CustomCursor from './components/CustomCursor.vue'

const loaded = ref(false)
const showConfig = ref(false)
const showCursor = ref(false)
const bgImage = ref('https://img.qbhx123.top/PicGo/background1.png')
let clickCount = 0
let clickTimer = null

const onLogoSecretClick = () => {
  clickCount++
  clearTimeout(clickTimer)
  clickTimer = setTimeout(() => { clickCount = 0 }, 800)
  if (clickCount >= 5) {
    clickCount = 0
    showConfig.value = true
  }
}

onMounted(() => {
  const saved = localStorage.getItem('config_bg')
  if (saved) bgImage.value = saved
  const cursorSaved = localStorage.getItem('config_cursor')
  if (cursorSaved === 'true') showCursor.value = true
})
</script>

<template>
  <div class="page-bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
  <ScrollProgressBar />
  <LoadingOverlay v-if="!loaded" @complete="loaded = true" />
  <Navbar @logo-click="onLogoSecretClick" />
  <ClockWeather />
  <main :class="{ visible: loaded }">
    <HeroSection />
    <HitokotoSection />
    <ProgressSection />
    <TimelineSection />
    <GitHubStats />
    <SkillsSection />
    <ProjectsSection />
    <PhotoGallery />
    <BlogSection />
  </main>
  <FooterSection />
  <ConfigPanel v-if="showConfig" @close="showConfig = false" />
  <Teleport to="body">
    <CustomCursor v-if="showCursor" />
  </Teleport>
</template>

<style>
main {
  opacity: 0;
  transition: opacity 0.6s ease;
}

main.visible {
  opacity: 1;
}
</style>
