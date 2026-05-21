import { onMounted, onUnmounted } from 'vue'

export function useTilt3D(el, options = {}) {
  const { maxTilt = 10, scale = 1.02 } = options
  let isHoverDevice = false

  const handleMouseMove = (e) => {
    if (!isHoverDevice || !el.value) return
    const rect = el.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    el.value.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    el.value.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
    el.value.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)
  }

  const handleMouseLeave = () => {
    if (!el.value) return
    el.value.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  onMounted(() => {
    if (!el.value) return
    isHoverDevice = window.matchMedia('(hover: hover)').matches
    if (!isHoverDevice) return

    el.value.style.transition = 'transform 0.3s ease'
    el.value.style.transformStyle = 'preserve-3d'
    el.value.style.willChange = 'transform'
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
