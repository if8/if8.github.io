import { ref, onMounted, onUnmounted } from '@libs/composition-api'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function handler(e) {
    x.value = e.clientX
    y.value = e.clientY
  }

  onMounted(() => {
    window.addEventListener('mousemove', handler, false)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handler, false)
  })

  return {
    x,
    y,
  }
}
