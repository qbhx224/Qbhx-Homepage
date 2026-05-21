import { onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollReveal(el, options = {}) {
  const { rootMargin = '0px 0px -80px 0px', threshold = 0.1 } = options
  let observer = null
  let mutationObserver = null

  function observeTargets(container) {
    if (!container) return
    const targets = container.querySelectorAll('.scroll-reveal')
    targets.forEach((target) => {
      if (!target.classList.contains('is-revealed')) {
        observer.observe(target)
      }
    })
  }

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

    observeTargets(el.value)

    // Watch for new .scroll-reveal elements added after data loads
    mutationObserver = new MutationObserver(() => {
      observeTargets(el.value)
    })
    mutationObserver.observe(el.value, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (mutationObserver) mutationObserver.disconnect()
  })
}
