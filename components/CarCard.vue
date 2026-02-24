<template>
  <NuxtLink 
    :to="`/veturat/${car.id}`" 
    class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
    :class="car.status === 'sold' ? 'pointer-events-none' : ''"
  >
    <div class="relative h-64 overflow-hidden bg-gray-200 shrink-0">
      <img 
        :src="car.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'" 
        :alt="car.model" 
        class="w-full h-full object-cover transition-transform duration-700 ease-in-out"
        :class="car.status !== 'sold' ? 'group-hover:scale-110' : 'grayscale opacity-60'"
      />

      <!-- Overlay E Shitur -->
      <div v-if="car.status === 'sold'" class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-red-600 text-white font-extrabold text-2xl px-6 py-3 rounded-xl rotate-[-8deg] shadow-2xl tracking-wide uppercase border-2 border-white/30">
          E Shitur
        </div>
      </div>

      <div v-if="car.featured && car.status !== 'sold'" class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
        E Veçuar
      </div>
      <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-black shadow-sm">
        {{ car.year }}
      </div>
    </div>

    <div class="p-6 flex flex-col flex-grow" :class="car.status === 'sold' ? 'opacity-60' : ''">
      <div class="text-sm text-gray-500 mb-1 font-medium">{{ car.brand }}</div>
      <h3 class="text-xl font-bold text-gray-900 mb-4 line-clamp-1">{{ car.model }}</h3>
      
      <div class="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 flex-grow">
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <Icon name="mdi:speedometer" class="text-gray-400 text-lg" /> {{ car.km.toLocaleString() }} km
        </div>
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <Icon name="mdi:gas-station" class="text-gray-400 text-lg" /> {{ car.fuel }}
        </div>
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <Icon name="mdi:car-shift-pattern" class="text-gray-400 text-lg" /> {{ car.transmission }}
        </div>
        <div class="flex items-center gap-2 text-gray-600 text-sm line-clamp-1">
          <Icon name="mdi:engine" class="text-gray-400 text-lg" /> {{ car.power }}
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <span class="text-2xl font-extrabold" :class="car.status === 'sold' ? 'text-gray-400 line-through' : 'text-red-600'">
          {{ car.price.toLocaleString() }}{{ car.currency }}
        </span>
        <span v-if="car.status !== 'sold'" class="text-black font-semibold group-hover:text-red-600 transition-colors flex items-center gap-1">
          Detajet <Icon name="mdi:arrow-right" class="group-hover:translate-x-1 transition-transform"/>
        </span>
        <span v-else class="text-gray-400 font-semibold text-sm">E Shitur</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  car: {
    type: Object,
    required: true
  }
})
</script>