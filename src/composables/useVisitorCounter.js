import { ref, onMounted } from 'vue'

export function useVisitorCounter() {
  const count = ref(0)

  onMounted(async () => {
    try {
      const res = await fetch('/api/visitors', { method: 'POST' })
      const data = await res.json()
      count.value = data.total
    } catch {
      count.value = 0
    }
  })

  return count
}
