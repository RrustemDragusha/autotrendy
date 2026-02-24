<template>
  <div class="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
    <header class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center group">
          <img src="/logo.png" alt="Auto Trendy Logo" class="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
        </NuxtLink>
        
        <div class="hidden md:flex space-x-8 items-center font-medium">
          <NuxtLink to="/" class="hover:text-red-600 transition-colors" exact-active-class="text-red-600">Ballina</NuxtLink>
          <NuxtLink to="/veturat" class="hover:text-red-600 transition-colors flex items-center gap-1.5" active-class="text-red-600">
            Veturat
            <ClientOnly>
              <span class="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">{{ cars.length }}</span>
            </ClientOnly>
          </NuxtLink>
          <NuxtLink to="/rreth-nesh" class="hover:text-red-600 transition-colors" active-class="text-red-600">Rreth Nesh</NuxtLink>
          <NuxtLink to="/kontakt" class="hover:text-red-600 transition-colors" active-class="text-red-600">Kontakt</NuxtLink>
          <NuxtLink to="/admin" class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Admin
          </NuxtLink>
        </div>

        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-black hover:text-red-600 focus:outline-none">
          <svg v-if="!isMobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </nav>

      <div v-show="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
        <div class="flex flex-col px-4 pt-2 pb-6 space-y-4 font-medium">
          <NuxtLink to="/" @click="isMobileMenuOpen = false" class="block py-2 text-gray-900 hover:text-red-600">Ballina</NuxtLink>
          <NuxtLink to="/veturat" @click="isMobileMenuOpen = false" class="flex items-center gap-2 py-2 text-gray-900 hover:text-red-600">
            Veturat
            <ClientOnly>
              <span class="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">{{ cars.length }}</span>
            </ClientOnly>
          </NuxtLink>
          <NuxtLink to="/rreth-nesh" @click="isMobileMenuOpen = false" class="block py-2 text-gray-900 hover:text-red-600">Rreth Nesh</NuxtLink>
          <NuxtLink to="/kontakt" @click="isMobileMenuOpen = false" class="block py-2 text-gray-900 hover:text-red-600">Kontakt</NuxtLink>
          <NuxtLink to="/admin" @click="isMobileMenuOpen = false" class="inline-flex bg-black text-white px-4 py-2 rounded-lg items-center gap-2 w-max">Admin</NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <!-- Scroll To Top -->
    <ScrollToTop />

    <ClientOnly>
      <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <TransitionGroup name="toast">
          <div v-for="toast in toasts" :key="toast.id" 
               class="px-5 py-3 rounded-lg shadow-xl text-white font-medium flex items-center gap-3 transform transition-all duration-300 min-w-[250px] pointer-events-auto"
               :class="toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'">
            <svg v-if="toast.type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {{ toast.message }}
          </div>
        </TransitionGroup>
      </div>
    </ClientOnly>

    <footer class="bg-black text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="mb-4"><img src="/logo.png" alt="Auto Trendy Logo" class="h-16 w-auto object-contain bg-white/10 p-2 rounded-xl" /></div>
          <p class="text-gray-400">Zgjedhja juaj e parë për vetura cilësore dhe të sigurta në Kosovë.</p>
        </div>
        <div>
          <h4 class="font-semibold text-lg mb-4 text-white">Kontakt</h4>
          <ul class="space-y-3 text-gray-400">
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Bajram Gashi 277–279, 14000 Lipjan</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> 049 934 984</li>
            <li class="flex items-center gap-3"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> autotrendy2019@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-lg mb-4 text-white">Na Ndiqni</h4>
          <a href="https://www.facebook.com/autosalontrendy" target="_blank" class="inline-flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-lg">Facebook</a>
        </div>
      </div>
      <div class="text-center mt-12 text-gray-600 border-t border-gray-800 pt-6">© {{ new Date().getFullYear() }} Auto Trendy. Të gjitha të drejtat e rezervuara.</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const { toasts } = useToast()
const { cars } = useCars()
</script>

<style>
.toast-enter-active, .toast-leave-active { transition: all 0.4s ease; }
.toast-enter-from { opacity: 0; transform: translateX(50px); }
.toast-leave-to { opacity: 0; transform: translateX(50px); }
</style>