<template>
  <div class="py-16 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Rreth <span class="text-red-600">Auto Trendy</span></h1>
      <img 
        src="https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/638631725_1204081895045778_2767026241721151771_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ykkrL_8-MoMQ7kNvwECu2mf&_nc_oc=Admtgsz-bgDasXBdnGtKyChYtxoKwWJAk0PiqyfgCcFtMH3M80IvWtDUFNGE_CVIQ88&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=YZchgk-sZkjlVVcxpDEkNw&oh=00_Aftlu0Nj0whUCkCVK5YXA-0r2WXnLn4JRwwARGCmToG4ZA&oe=69A3DA95&auto=format&fit=crop" 
        class="w-full h-80 object-cover rounded-2xl shadow-lg mb-12" 
        alt="Auto Trendy Showroom" 
      />
      
      <div class="prose prose-lg mx-auto text-gray-600 text-left">
        <p class="mb-6">E themeluar në vitin 2019 në Lipjan, <strong>Auto Trendy</strong> është kthyer shpejt në një nga destinacionet më të besuara për shitblerjen e veturave në Kosovë. Qëllimi ynë parësor është t'u ofrojmë klientëve tanë vetura të sigurta, të verifikuara dhe me standarde evropiane.</p>
        <p class="mb-6">Ne krenohemi me transparencën tonë. Çdo veturë në sallonin tonë kalon nëpër kontrolle të rrepta teknike dhe vjen me libër mirëmbajtjeje. Pavarësisht nëse kërkoni një veturë ekonomike për qytet, apo një SUV luksoz, ne kemi diçka për çdo buxhet.</p>
        <div class="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
          <h3 class="font-bold text-xl text-black mb-4">Pse të zgjidhni Auto Trendy?</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-3"><Icon name="mdi:check-circle" class="text-red-600 text-xl"/> Mundësi blerje përmes bankës me kushte fantastike.</li>
            <li class="flex items-center gap-3"><Icon name="mdi:check-circle" class="text-red-600 text-xl"/> Garanci për motor dhe ndërrues.</li>
            <li class="flex items-center gap-3"><Icon name="mdi:check-circle" class="text-red-600 text-xl"/> Mundësi këmbimi (Trade-in) me vlerësim real.</li>
            <li class="flex items-center gap-3"><Icon name="mdi:check-circle" class="text-red-600 text-xl"/> Shitje pa doganë për blerësit jashtë Kosovës.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Galeria e Sallonit -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Salloni Ynë</h2>
        <div class="w-16 h-1 bg-red-600 rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500 text-lg">Vizitoni dhe shihni veturat drejtpërdrejt.</p>
      </div>

      <!-- Grid galeria -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="(photo, idx) in galleryPhotos" 
          :key="idx"
          class="relative overflow-hidden rounded-2xl cursor-pointer group"
          :class="idx === 0 ? 'col-span-2 row-span-2 h-80 md:h-auto' : 'h-44'"
          @click="openGallery(idx)"
        >
          <img 
            :src="photo.src" 
            :alt="photo.alt"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Modal galeria -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="galleryModal.open" class="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" @click.self="galleryModal.open = false">
            <button @click="galleryModal.open = false" class="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 p-3 rounded-full z-50 transition-colors">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <button v-if="galleryModal.index > 0" @click="galleryModal.index--" class="absolute left-4 md:left-8 text-white bg-white/20 hover:bg-white/40 p-4 rounded-full z-50 transition backdrop-blur-md">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <img :src="galleryPhotos[galleryModal.index]?.src" class="max-w-[85vw] max-h-[85vh] object-contain rounded-xl" />

            <button v-if="galleryModal.index < galleryPhotos.length - 1" @click="galleryModal.index++" class="absolute right-4 md:right-8 text-white bg-white/20 hover:bg-white/40 p-4 rounded-full z-50 transition backdrop-blur-md">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <div class="absolute bottom-6 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {{ galleryModal.index + 1 }} / {{ galleryPhotos.length }}
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const galleryPhotos = [
  {
    src: 'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/638631725_1204081895045778_2767026241721151771_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ykkrL_8-MoMQ7kNvwECu2mf&_nc_oc=Admtgsz-bgDasXBdnGtKyChYtxoKwWJAk0PiqyfgCcFtMH3M80IvWtDUFNGE_CVIQ88&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=YZchgk-sZkjlVVcxpDEkNw&oh=00_Aftlu0Nj0whUCkCVK5YXA-0r2WXnLn4JRwwARGCmToG4ZA&oe=69A3DA95',
    alt: 'Auto Trendy Showroom'
  },
  {
    src: 'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/635607958_1201745191946115_7444359345583286497_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-vaX56RKewYQ7kNvwG1x2dP&_nc_oc=AdnfnKLx38aJ_Dwt06TuYSLoNnvyTqp-Bev8HemLQsIBS2_p_Be4wL7K7G4vD48AvhY&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=DolxHdQ2zJRGkQ7UILEslw&oh=00_AfvuEekF53NzcR3Enx2vONyHq7QcmUqQ6X8DAwZxzN7vBg&oe=699F6D1E',
    alt: 'Mercedes-Benz A 200'
  },
  {
    src: 'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/635563918_1200109042109730_6938518175280340489_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=IzP0DDuvKCwQ7kNvwH09MnD&_nc_oc=AdkMh0jCXFfWZ3yxjqVuJfn-xpsumZ1Wm2B0OWgFa_msPXLaBStX8z1thW88eLvrT-0&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=Hp8beQlCCliuXzWmdSwAlA&oh=00_Afsa0DcblHmx6Sp0lzdux-ouMnAI3MD1kKnkXOiaxLkdOQ&oe=699F6AF5',
    alt: 'Volkswagen Golf VIII'
  },
  {
    src: 'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/633921019_1197403009047000_5945407396882430202_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=5TCqfMUIWz8Q7kNvwH3IUeL&_nc_oc=AdlKmnpIKVqWbFXbLCqTqNvjAyoo-Jhsp9q9JwdPXJL5AXZT46ivTn4CnfldfrpoChI&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=tz5edrtNE0pBvfl6WrkhRw&oh=00_Afs162zaKuUnwTm-RCh9Fl9jPdVFTpElNEsP8B-fIEVWXg&oe=699F5A32',
    alt: 'Audi Q5'
  },
  {
    src: 'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/632305829_1195737572546877_6362412995142867824_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=tHGFoDX9uX8Q7kNvwEuukxA&_nc_oc=AdmYuk9NrqUvMcEhueGJTUaOx5hO5nxR_XOuQ6m-SR25k43KSRO6G9Wy1R7vVsW3lAQ&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=190huILHrEWU3aVsXwLEYA&oh=00_AfuqiNSR265HmXVG0H2j9y3vgN8yHHg-dRB_B-So3xgOtw&oe=699F61AA',
    alt: 'BMW 320d'
  },
]

const galleryModal = reactive({ open: false, index: 0 })
const openGallery = (idx) => { galleryModal.index = idx; galleryModal.open = true }
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>