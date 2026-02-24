<template>
  <div class="py-12 bg-gray-50 min-h-screen relative">
    <ClientOnly>
      <div v-if="car" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <NuxtLink to="/" class="hover:text-red-600">Ballina</NuxtLink> <span>/</span>
          <NuxtLink to="/veturat" class="hover:text-red-600">Veturat</NuxtLink> <span>/</span>
          <span class="text-gray-900 font-medium">{{ car.brand }} {{ car.model }}</span>
        </div>

        <!-- Badge E Shitur -->
        <div v-if="car.status === 'sold'" class="mb-6 bg-gray-900 text-white rounded-2xl px-6 py-4 flex items-center gap-3">
          <svg class="w-6 h-6 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="font-semibold">Kjo veturë është shitur. <NuxtLink to="/veturat" class="text-red-400 hover:text-red-300 underline">Shiko veturat e tjera të disponueshme →</NuxtLink></p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 space-y-4">
            <div 
              class="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-white shadow-lg cursor-pointer group flex justify-center items-center border border-gray-100"
              @click="openZoomModal"
            >
              <img :src="activeImage" :alt="car.model" class="w-full h-full object-contain" :class="car.status === 'sold' ? 'grayscale opacity-70' : ''" />
              <div v-if="car.status === 'sold'" class="absolute inset-0 flex items-center justify-center">
                <div class="bg-red-600 text-white font-extrabold text-3xl px-8 py-4 rounded-xl rotate-[-8deg] shadow-2xl tracking-wide uppercase border-2 border-white/30">E Shitur</div>
              </div>
              <div v-else class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="bg-black/70 text-white p-4 rounded-full backdrop-blur-sm flex items-center gap-2 font-semibold">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                  Kliko për ta Zmadhuar
                </div>
              </div>
            </div>

            <div class="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <button 
                v-for="(img, idx) in car.images" 
                :key="idx"
                @click="activeImage = img"
                class="h-24 w-32 shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none"
                :class="activeImage === img ? 'border-red-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Panel djathtas -->
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-28">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ car.brand }} {{ car.model }}</h1>
            <p class="text-gray-500 mb-6">{{ car.year }} • {{ car.km.toLocaleString() }} km</p>
            <div class="mb-8 pb-8 border-b border-gray-100 flex items-center justify-between">
              <div class="text-4xl font-extrabold" :class="car.status === 'sold' ? 'text-gray-400 line-through' : 'text-red-600'">
                {{ car.price.toLocaleString() }}{{ car.currency }}
              </div>
              <span v-if="car.status === 'sold'" class="bg-gray-900 text-white text-sm font-bold px-3 py-1.5 rounded-lg">E Shitur</span>
            </div>

            <div class="grid grid-cols-2 gap-6 mb-8">
              <div><span class="block text-sm text-gray-500 mb-1">Karburanti</span><span class="font-semibold">{{ car.fuel }}</span></div>
              <div><span class="block text-sm text-gray-500 mb-1">Ndërruesi</span><span class="font-semibold">{{ car.transmission }}</span></div>
              <div><span class="block text-sm text-gray-500 mb-1">Motori</span><span class="font-semibold">{{ car.engine }}</span></div>
              <div><span class="block text-sm text-gray-500 mb-1">Ngjyra</span><span class="font-semibold">{{ car.color }}</span></div>
            </div>

            <div class="mb-8">
              <h3 class="font-bold text-lg mb-3">Përshkrimi</h3>
              <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ car.description }}</p>
            </div>

            <!-- Butonat kontakt (vetëm nëse nuk është shitur) -->
            <div v-if="car.status !== 'sold'" class="flex flex-col gap-3">
              <a href="tel:049934984" class="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
                📞 Thirr Tani: 049 934 984
              </a>
              <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors shadow-lg">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
            <div v-else>
              <NuxtLink to="/veturat" class="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg">
                Shiko Veturat e Tjera
              </NuxtLink>
            </div>

            <!-- Butoni Share -->
            <button @click="shareVetura" class="mt-3 w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              {{ shareCopied ? '✓ Linku u kopjua!' : 'Shpërnda Veturën' }}
            </button>
          </div>
        </div>

        <!-- Navigim mes veturave -->
        <div class="mt-16 pt-8 border-t border-gray-200">
          <h3 class="text-xl font-bold text-gray-800 mb-6">Shfleto Veturat Tjera</h3>
          <div class="flex flex-col sm:flex-row justify-between gap-4">
            <NuxtLink v-if="prevCar" :to="`/veturat/${prevCar.id}`" class="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all group flex-1">
              <svg class="w-8 h-8 text-gray-400 group-hover:text-red-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              <img :src="prevCar.images[0]" class="w-16 h-12 object-cover rounded-lg shrink-0" />
              <div class="overflow-hidden">
                <p class="text-xs text-gray-400 mb-0.5">Vetura e mëparshme</p>
                <p class="font-bold text-gray-900 truncate">{{ prevCar.brand }} {{ prevCar.model }}</p>
                <p class="text-red-600 font-semibold text-sm">{{ prevCar.price.toLocaleString() }}{{ prevCar.currency }}</p>
              </div>
            </NuxtLink>
            <div v-else class="flex-1"></div>
            <NuxtLink v-if="nextCar" :to="`/veturat/${nextCar.id}`" class="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all group flex-1 flex-row-reverse text-right">
              <svg class="w-8 h-8 text-gray-400 group-hover:text-red-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              <img :src="nextCar.images[0]" class="w-16 h-12 object-cover rounded-lg shrink-0" />
              <div class="overflow-hidden">
                <p class="text-xs text-gray-400 mb-0.5">Vetura tjetër</p>
                <p class="font-bold text-gray-900 truncate">{{ nextCar.brand }} {{ nextCar.model }}</p>
                <p class="text-red-600 font-semibold text-sm">{{ nextCar.price.toLocaleString() }}{{ nextCar.currency }}</p>
              </div>
            </NuxtLink>
            <div v-else class="flex-1"></div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-20 text-2xl font-bold text-gray-600">Vetura nuk u gjet!</div>
    </ClientOnly>

    <!-- Modal Zoom -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center select-none">
        <button @click="isModalOpen = false" class="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-lg z-50 transition-colors flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <button @click="prevImage" v-if="currentIndex > 0" class="absolute left-4 md:left-8 text-white bg-white/20 hover:bg-white/40 p-4 rounded-full z-50 transition backdrop-blur-md">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div class="relative w-[85vw] h-[85vh] cursor-crosshair flex justify-center items-center" ref="imageContainer" @mousemove="handleZoom" @mouseleave="isZoomed = false" @mouseenter="isZoomed = true">
          <img :src="activeImage" class="max-w-full max-h-full object-contain transition-opacity duration-200" :class="{ 'opacity-0': isZoomed }" />
          <div v-show="isZoomed" class="absolute inset-0 bg-no-repeat pointer-events-none" :style="{ backgroundImage: `url(${activeImage})`, backgroundPosition: zoomPosition, backgroundSize: '250%' }"></div>
        </div>
        <button @click="nextImage" v-if="currentIndex < car.images.length - 1" class="absolute right-4 md:right-8 text-white bg-white/20 hover:bg-white/40 p-4 rounded-full z-50 transition backdrop-blur-md">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
        <div class="absolute bottom-6 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
          Foto {{ currentIndex + 1 }} nga {{ car.images.length }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'

const route = useRoute()
const { cars } = useCars()

const car = computed(() => cars.value.find(c => c.id === route.params.id))
const activeImage = ref('')

watchEffect(() => {
  if (car.value && car.value.images.length > 0 && !activeImage.value) {
    activeImage.value = car.value.images[0]
  }
})

// SEO dinamik
useHead(computed(() => ({
  title: car.value ? `${car.value.brand} ${car.value.model} ${car.value.year} – Auto Trendy` : 'Auto Trendy',
  meta: [{
    name: 'description',
    content: car.value
      ? `${car.value.brand} ${car.value.model} ${car.value.year}, ${car.value.km.toLocaleString()} km, ${car.value.fuel}, ${car.value.price.toLocaleString()}€ – Auto Trendy Lipjan, Kosovë.`
      : 'Auto Trendy – Shitblerje veturash, Lipjan.'
  }]
})))

// WhatsApp
const whatsappLink = computed(() => {
  if (!car.value) return '#'
  const msg = encodeURIComponent(`Pershendetje, jam i interesuar per ${car.value.brand} ${car.value.model} ${car.value.year} me cmim ${car.value.price.toLocaleString()}€. A eshte ende ne shitje?`)
  return `https://wa.me/38349934984?text=${msg}`
})

// Share / Kopjo link
const shareCopied = ref(false)
const shareVetura = async () => {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: `${car.value.brand} ${car.value.model}`, url })
    } catch {}
  } else {
    await navigator.clipboard.writeText(url)
    shareCopied.value = true
    setTimeout(() => { shareCopied.value = false }, 2500)
  }
}

// Navigim mes veturave
const currentCarIndex = computed(() => cars.value.findIndex(c => c.id === route.params.id))
const prevCar = computed(() => currentCarIndex.value > 0 ? cars.value[currentCarIndex.value - 1] : null)
const nextCar = computed(() => currentCarIndex.value < cars.value.length - 1 ? cars.value[currentCarIndex.value + 1] : null)

// Modal & Zoom
const isModalOpen = ref(false)
const isZoomed = ref(false)
const zoomPosition = ref('50% 50%')
const imageContainer = ref(null)
const currentIndex = computed(() => car.value ? car.value.images.indexOf(activeImage.value) : 0)
const openZoomModal = () => { if (car.value?.status !== 'sold') isModalOpen.value = true }
const prevImage = (e) => { e.stopPropagation(); if (currentIndex.value > 0) activeImage.value = car.value.images[currentIndex.value - 1] }
const nextImage = (e) => { e.stopPropagation(); if (currentIndex.value < car.value.images.length - 1) activeImage.value = car.value.images[currentIndex.value + 1] }
const handleZoom = (e) => {
  if (!imageContainer.value) return
  const { left, top, width, height } = imageContainer.value.getBoundingClientRect()
  zoomPosition.value = `${((e.clientX - left) / width) * 100}% ${((e.clientY - top) / height) * 100}%`
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
</style>