import { ref, onMounted } from 'vue'

export function useVisitorCounter() {
  const count = ref(0)

  onMounted(() => {
    const today = new Date().toDateString()
    const lastVisit = localStorage.getItem('visitor_last_visit')

    if (lastVisit !== today) {
      const current = parseInt(localStorage.getItem('visitor_count') || '0', 10)
      count.value = current + 1
      localStorage.setItem('visitor_count', count.value.toString())
      localStorage.setItem('visitor_last_visit', today)
    } else {
      count.value = parseInt(localStorage.getItem('visitor_count') || '1', 10)
    }
  })

  return count
}
