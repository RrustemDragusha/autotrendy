<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center max-w-lg mx-auto">
      <!-- Numri 404 -->
      <div class="relative mb-8 select-none">
        <div class="text-[160px] md:text-[200px] font-extrabold text-gray-100 leading-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-red-600 text-white text-lg font-bold px-5 py-2.5 rounded-xl shadow-lg">
            Faqja nuk u gjet
          </div>
        </div>
      </div>

      <!-- Teksti -->
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Ups! Duket si kemi problem.
      </h1>
      <p class="text-gray-500 text-lg mb-10 leading-relaxed">
        Faqja që po kërkoni nuk ekziston ose është zhvendosur.<br/>
        Mos u shqetëso — ka shumë vetura të mira duke të pritur!
      </p>

      <!-- Butonat -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/veturat" 
          class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          Shiko Veturat
        </NuxtLink>
        <NuxtLink 
          to="/" 
          class="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Ballina
        </NuxtLink>
      </div>

      <!-- Logo e vogël -->
      <div class="mt-16">
        <NuxtLink to="/">
          <img src="/logo.png" alt="Auto Trendy" class="h-12 w-auto object-contain mx-auto opacity-40 hover:opacity-70 transition-opacity" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script>