import { onMounted, onUnmounted } from 'vue'

export function useParallax(el) {
  let isHoverDevice = false

  const handleMouseMove = (e) => {
    if (!isHoverDevice || !el.value) return
    const rect = el.value.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    el.value.style.setProperty('--px', `${x * 30}px`)
    el.value.style.setProperty('--py', `${y * 30}px`)
  }

  const handleMouseLeave = () => {
    if (!el.value) return
    el.value.style.setProperty('--px', '0px')
    el.value.style.setProperty('--py', '0px')
  }

  onMounted(() => {
    if (!el.value) return
    isHoverDevice = window.matchMedia('(hover: hover)').matches
    if (!isHoverDevice) return

    el.value.style.transition = '--px 0.4s ease, --py 0.4s ease'
    el.value.addEventListener('mousemove', handleMouseMove)
    el.value.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener('mousemove', handleMouseMove)
      el.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })
}
