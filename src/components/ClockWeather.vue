<template>
  <div class="clock-weather">
    <div class="cw-container">
      <div class="clock-side">
        <div class="clock-time">{{ time }}</div>
        <div class="clock-date">{{ date }} {{ weekday }}</div>
      </div>
      <div class="weather-side">
        <div class="weather-info" v-if="weather.temp">
          <span class="weather-city">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ displayCity }}
          </span>
          <span class="weather-temp">{{ weather.temp }}°C</span>
          <span class="weather-desc">{{ weather.desc }}</span>
          <span class="weather-detail">湿度 {{ weather.humidity }}%</span>
        </div>
        <div class="weather-loading" v-else>天气加载中...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const date = ref('')
const weekday = ref('')
const weather = ref({ temp: '', desc: '', humidity: '' })
const displayCity = ref(localStorage.getItem('config_city_display') || '芜湖')
let timer = null

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('zh-CN', { hour12: false })
  date.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
  weekday.value = weekdays[now.getDay()]
}

const cityMap = {
  'Wuhu': '芜湖', 'Beijing': '北京', 'Shanghai': '上海', 'Guangzhou': '广州',
  'Shenzhen': '深圳', 'Hangzhou': '杭州', 'Nanjing': '南京', 'Chengdu': '成都',
  'Wuhan': '武汉', 'Tokyo': '东京', 'New York': '纽约', 'London': '伦敦',
}

const getCity = () => localStorage.getItem('config_city') || 'Wuhu'

const fetchWeather = async () => {
  const city = getCity()
  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`)
    const data = await res.json()
    const current = data.current_condition[0]
    weather.value = {
      temp: current.temp_C,
      desc: current.lang_zh?.[0]?.value || current.weatherDesc[0].value,
      humidity: current.humidity
    }
    displayCity.value = cityMap[city] || city
    localStorage.setItem('config_city_display', displayCity.value)
  } catch {
    weather.value = { temp: '--', desc: '暂无数据', humidity: '--' }
  }
}

const onConfigChange = (e) => {
  if (e.detail?.key === 'city') {
    fetchWeather()
  }
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  fetchWeather()
  window.addEventListener('config-changed', onConfigChange)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('config-changed', onConfigChange)
})
</script>

<style scoped>
.clock-weather {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  padding: 10px 24px;
  margin-top: 64px;
}

.cw-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.clock-side {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.clock-time {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
}

.clock-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.weather-side {
  display: flex;
  align-items: center;
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.9rem;
}

.weather-city {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-weight: 500;
}

.weather-temp {
  font-weight: 700;
  color: var(--accent);
  font-size: 1.1rem;
}

.weather-desc {
  color: var(--text-secondary);
}

.weather-detail {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.weather-loading {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .cw-container {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }
  .clock-side { gap: 8px; }
  .clock-time { font-size: 1.1rem; }
  .weather-info { gap: 10px; font-size: 0.85rem; flex-wrap: wrap; justify-content: center; }
}
</style>
