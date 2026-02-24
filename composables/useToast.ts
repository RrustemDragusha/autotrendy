import { ref } from 'vue'

const toasts = ref<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([])

export const useToast = () => {
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    toasts.value.push({ id, message, type })
    
    // Largoje automatikisht pas 3 sekondash
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  return { toasts, addToast }
}