import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(el, options = {}) {
  const { rootMargin = '0px 0px -80px 0px', threshold = 0.1 } = options
  let observer = null

  onMounted(() => {
    if (!el.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    observer.observe(el.value)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
