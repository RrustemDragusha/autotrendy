<template>
  <Transition name="scroll-btn">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-24 right-6 z-50 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      aria-label="Kthehu lart"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.scroll-btn-enter-active, .scroll-btn-leave-active { transition: all 0.3s ease; }
.scroll-btn-enter-from, .scroll-btn-leave-to { opacity: 0; transform: translateY(10px); }
</style>