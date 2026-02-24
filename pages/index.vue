<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-black text-white h-[85vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-50 scale-105 animate-pulse-slow" style="background-image: url('https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/623520109_1186418546812113_4997378143835209483_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=R8n7k9I_Vp8Q7kNvwHX8h2G&_nc_oc=Adn0m8__D3ShUDyDi9XrkobK20RqyiZ00mnFb5YbcjoAV9V3jstYqDg2UHmJGNQm7g4&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=rzNA4v9VVyFgDtNlytGUGw&oh=00_Afv3uZQFATIcsrvykvBncizVzGnF6obojX0F0P2r2IzhSw&oe=69A15972&auto=format&fit=crop');"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <span class="text-red-500 font-bold tracking-widest uppercase mb-4 block">Auto Trendy</span>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">Elegancë dhe <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Performancë</span></h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">Veturat më ekskluzive me cilësi të garantuar. Gjeni veturën tuaj të ardhshme sot me Auto Trendy.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/veturat" class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-red-600/30">Shiko Ofertat</NuxtLink>
          <NuxtLink to="/kontakt" class="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all">Na Kontakto</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistikat -->
    <section class="bg-black text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="group">
            <div class="text-4xl md:text-5xl font-extrabold text-red-500 mb-1 tabular-nums">
              <span ref="el => statRefs[stat.label] = el">{{ animatedStats[stat.label] }}</span>{{ stat.suffix }}
            </div>
            <div class="text-gray-400 font-medium text-sm md:text-base">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Veturat e Veçuara -->
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-3">Veturat e Veçuara</h2>
          <div class="w-20 h-1 bg-red-600 rounded-full mb-4"></div>
          <p class="text-gray-500 text-lg">Zgjedhjet tona top për ju këtë javë.</p>
        </div>
        <NuxtLink to="/veturat" class="hidden md:flex items-center gap-2 font-medium text-black hover:text-red-600 transition-colors">
          Shiko të gjitha <Icon name="mdi:arrow-right" class="text-xl"/>
        </NuxtLink>
      </div>

      <ClientOnly fallback-tag="div" fallback="Duke ngarkuar veturat...">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CarCard v-for="car in featuredCars" :key="car.id" :car="car" />
        </div>
      </ClientOnly>
      
      <div class="mt-12 text-center md:hidden">
        <NuxtLink to="/veturat" class="inline-flex bg-black text-white px-6 py-3 rounded-lg font-medium">Shiko të gjitha veturat</NuxtLink>
      </div>
    </section>

    <!-- Testimoniale -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-3">Çfarë Thonë Klientët Tanë</h2>
          <div class="w-20 h-1 bg-red-600 rounded-full mx-auto mb-4"></div>
          <p class="text-gray-500 text-lg">Mbi 200 klientë të kënaqur na besuan zgjedhjen e tyre.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="review in testimonials" :key="review.name" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <!-- Yjet -->
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <!-- Teksti -->
            <p class="text-gray-600 leading-relaxed mb-6 italic">"{{ review.text }}"</p>
            <!-- Autori -->
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {{ review.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-gray-900">{{ review.name }}</p>
                <p class="text-sm text-gray-400">{{ review.car }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const { cars } = useCars()
const featuredCars = computed(() => cars.value.filter(c => c.featured).slice(0, 6))

// Statistikat
const stats = [
  { label: 'Vetura të Shitura', value: 500, suffix: '+' },
  { label: 'Vjet Eksperiencë', value: 6, suffix: '' },
  { label: 'Klientë të Kënaqur', value: 200, suffix: '+' },
  { label: 'Brende të Ndryshme', value: 25, suffix: '+' },
]

const animatedStats = reactive({})
stats.forEach(s => { animatedStats[s.label] = 0 })

onMounted(() => {
  // Animacion counter kur faqja ngarkohet
  setTimeout(() => {
    stats.forEach(stat => {
      const duration = 1800
      const steps = 60
      const increment = stat.value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          animatedStats[stat.label] = stat.value
          clearInterval(timer)
        } else {
          animatedStats[stat.label] = Math.floor(current)
        }
      }, duration / steps)
    })
  }, 300)
})

// Testimoniale
const testimonials = [
  {
    name: 'Arben Krasniqi',
    car: 'BMW 320d xDrive',
    text: 'Shërbim i jashtëzakonshëm! Ekipi i Auto Trendy më ndihmoi të gjej veturën e duhur brenda buxhetit tim. Shumë profesionalë dhe të sinqertë.'
  },
  {
    name: 'Flakë Berisha',
    car: 'Mercedes A 200',
    text: 'Bleva veturën time të parë nga Auto Trendy dhe jam jashtëzakonisht e kënaqur. Procesi ishte i thjeshtë, transparent dhe pa presion. Rekomandoj fort!'
  },
  {
    name: 'Driton Morina',
    car: 'Audi Q5 Hibride',
    text: 'Vetura ishte saktësisht siç e përshkruan faqja — pa surpriza! Edhe mundësia e blerjes përmes bankës ishte shumë e lehtë. Faleminderit Auto Trendy!'
  }
]
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>