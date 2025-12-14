import { ref, watch, onUnmounted, type Ref } from 'vue'

export function useDebounce<T>(
  source: Ref<T>,
  delay: number = 300,
  callback?: (value: T) => void
) {
  const debouncedValue = ref<T>(source.value) as Ref<T>
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounceFunction = (value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      debouncedValue.value = value
      if (callback) {
        callback(value)
      }
    }, delay)
  }

  watch(source, (newValue) => {
    debounceFunction(newValue)
  })

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })

  return {
    debouncedValue,
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }
  }
}