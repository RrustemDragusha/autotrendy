<template>
  <div class="py-16 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gjeni Veturën Tuaj</h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto">Shfletoni inventarin tonë të plotë të veturave të cilësisë së lartë.</p>
      </div>

      <!-- Paneli i filterave -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 space-y-4">
        <!-- Rreshti 1: Search + Sort -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Kërko sipas emrit, brendit ose modelit..."
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>
          <select
            v-model="sortOrder"
            class="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition cursor-pointer font-medium text-gray-700 bg-white"
          >
            <option value="">Rendit sipas...</option>
            <option value="asc">Çmimi: nga më i ulëti</option>
            <option value="desc">Çmimi: nga më i larti</option>
          </select>
        </div>

        <!-- Rreshti 2: Filtera shtesë -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select v-model="filterBrand" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700 cursor-pointer">
            <option value="">Të gjithë brendat</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
          </select>

          <select v-model="filterFuel" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700 cursor-pointer">
            <option value="">Të gjithë karburantet</option>
            <option>Diesel</option>
            <option>Benzinë</option>
            <option>Hibride</option>
            <option>Elektrike</option>
          </select>

          <select v-model="filterTransmission" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700 cursor-pointer">
            <option value="">Të dy ndërruesit</option>
            <option>Automatik</option>
            <option>Manual</option>
          </select>

          <select v-model="filterPrice" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700 cursor-pointer">
            <option value="">Të gjitha çmimet</option>
            <option value="0-15000">Deri në 15,000€</option>
            <option value="15000-25000">15,000€ – 25,000€</option>
            <option value="25000-35000">25,000€ – 35,000€</option>
            <option value="35000-999999">Mbi 35,000€</option>
          </select>
        </div>

        <!-- Numri i rezultateve + Reset -->
        <div class="flex items-center justify-between pt-1">
          <p class="text-sm text-gray-500">
            <span v-if="isFiltering">
              <span class="font-semibold text-gray-900">{{ filteredCars.length }}</span> rezultate gjetur
              <span v-if="searchQuery.trim()"> për "<span class="text-red-600 font-medium">{{ searchQuery }}</span>"</span>
            </span>
            <span v-else>
              Duke shfaqur <span class="font-semibold text-gray-900">{{ filteredCars.length }}</span> vetura
            </span>
          </p>
          <button
            v-if="isFiltering"
            @click="resetFilters"
            class="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            Pastro filterat
          </button>
        </div>
      </div>
      
      <ClientOnly>
        <!-- Skeleton loading -->
        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="i in 6" :key="i" class="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div class="h-64 bg-gray-200"></div>
              <div class="p-6 space-y-3">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-5 bg-gray-200 rounded w-2/3"></div>
                <div class="grid grid-cols-2 gap-2 mt-4">
                  <div class="h-3 bg-gray-200 rounded"></div>
                  <div class="h-3 bg-gray-200 rounded"></div>
                  <div class="h-3 bg-gray-200 rounded"></div>
                  <div class="h-3 bg-gray-200 rounded"></div>
                </div>
                <div class="h-6 bg-gray-200 rounded w-1/2 mt-4"></div>
              </div>
            </div>
          </div>
        </template>

        <div v-if="filteredCars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CarCard v-for="car in filteredCars" :key="car.id" :car="car" />
        </div>

        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-xl font-semibold text-gray-500">Nuk u gjet asnjë veturë</p>
          <p class="text-gray-400 mt-1">Provo të ndryshosh filterat ose kërkon diçka tjetër.</p>
          <button @click="resetFilters" class="mt-4 px-5 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
            Pastro Filterat
          </button>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { cars } = useCars()

const searchQuery = ref('')
const sortOrder = ref('')
const filterBrand = ref('')
const filterFuel = ref('')
const filterTransmission = ref('')
const filterPrice = ref('')

const availableBrands = computed(() => [...new Set(cars.value.map(c => c.brand))].sort())

const isFiltering = computed(() =>
  searchQuery.value.trim() || sortOrder.value || filterBrand.value ||
  filterFuel.value || filterTransmission.value || filterPrice.value
)

const filteredCars = computed(() => {
  let result = [...cars.value]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(car =>
      car.brand.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      `${car.brand} ${car.model}`.toLowerCase().includes(q)
    )
  }

  if (filterBrand.value) result = result.filter(c => c.brand === filterBrand.value)
  if (filterFuel.value) result = result.filter(c => c.fuel === filterFuel.value)
  if (filterTransmission.value) result = result.filter(c => c.transmission === filterTransmission.value)

  if (filterPrice.value) {
    const [min, max] = filterPrice.value.split('-').map(Number)
    result = result.filter(c => c.price >= min && c.price <= max)
  }

  if (sortOrder.value === 'asc') result.sort((a, b) => a.price - b.price)
  else if (sortOrder.value === 'desc') result.sort((a, b) => b.price - a.price)

  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  sortOrder.value = ''
  filterBrand.value = ''
  filterFuel.value = ''
  filterTransmission.value = ''
  filterPrice.value = ''
}
</script>