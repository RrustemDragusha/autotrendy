<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div class="flex items-center justify-between mb-8 pb-4 border-b">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Paneli i Adminit
        </h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form @submit.prevent="submitCar" class="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
          <div class="flex justify-between items-center mb-4 border-b pb-2">
            <h2 class="text-xl font-semibold text-black">{{ editingId ? 'Modifiko Veturën' : 'Posto Veturë të Re' }}</h2>
            <button v-if="editingId" @click="cancelEdit" type="button" class="text-sm text-gray-500 hover:text-black">Anulo Modifikimin</button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium mb-1">Brendi</label><input v-model="form.brand" type="text" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Modeli</label><input v-model="form.model" type="text" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Viti</label><input v-model="form.year" type="number" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Çmimi (€)</label><input v-model="form.price" type="number" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Kilometrat</label><input v-model="form.km" type="number" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Karburanti</label><select v-model="form.fuel" class="w-full p-2 border rounded-lg"><option>Diesel</option><option>Benzinë</option><option>Hibride</option><option>Elektrike</option></select></div>
            <div><label class="block text-sm font-medium mb-1">Ndërruesi</label><select v-model="form.transmission" class="w-full p-2 border rounded-lg"><option>Automatik</option><option>Manual</option></select></div>
            <div><label class="block text-sm font-medium mb-1">Motori (psh. 2.0 TDI)</label><input v-model="form.engine" type="text" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Fuqia (psh. 150 HP)</label><input v-model="form.power" type="text" class="w-full p-2 border rounded-lg" required></div>
            <div><label class="block text-sm font-medium mb-1">Ngjyra</label><input v-model="form.color" type="text" class="w-full p-2 border rounded-lg" required></div>
          </div>
          <div><label class="block text-sm font-medium mb-1">Përshkrimi</label><textarea v-model="form.description" rows="3" class="w-full p-2 border rounded-lg"></textarea></div>

          <!-- Fotot me drag & drop -->
          <div>
            <label class="block text-sm font-medium mb-1">Ngarko Fotot</label>
            <input type="file" multiple accept="image/*" @change="handleFileUpload" class="w-full p-2 border rounded-lg bg-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100">
            <div v-if="form.images.length > 0" class="mt-3">
              <p class="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
                Tërhiqe fotot për të ndryshuar renditjen. Foto e parë do të shfaqet si foto kryesore.
              </p>
              <div class="flex flex-wrap gap-2">
                <div v-for="(img, index) in form.images" :key="index" class="relative w-20 h-20 group cursor-grab active:cursor-grabbing" draggable="true" @dragstart="onDragStart(index)" @dragover.prevent="onDragOver(index)" @drop.prevent="onDrop(index)" @dragend="onDragEnd" :class="dragOverIndex === index ? 'ring-2 ring-red-500 scale-105' : ''" style="transition: transform 0.15s">
                  <span v-if="index === 0" class="absolute -top-2 -left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10 leading-tight">Kryesore</span>
                  <span class="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full z-10">{{ index + 1 }}</span>
                  <img :src="img" class="w-full h-full object-cover rounded-md border border-gray-200" :class="dragFromIndex === index ? 'opacity-40' : ''" />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-md">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>
                  </div>
                  <button @click.prevent="removeImage(index)" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20">×</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Checkboxet -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="form.featured" id="featured" class="w-4 h-4 text-black border-gray-300 rounded">
              <label for="featured" class="text-sm font-medium text-gray-700">Shfaq te "Veturat e Veçuara"</label>
            </div>
            <!-- Toggle E Shitur -->
            <div class="flex items-center justify-between p-4 bg-white border rounded-xl">
              <div>
                <p class="text-sm font-semibold text-gray-800">Statusi i Veturës</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ form.status === 'sold' ? 'Vetura shfaqet si E Shitur në faqe' : 'Vetura është e disponueshme' }}</p>
              </div>
              <button
                type="button"
                @click="form.status = form.status === 'sold' ? 'available' : 'sold'"
                class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
                :class="form.status === 'sold' ? 'bg-red-600' : 'bg-gray-200'"
              >
                <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform" :class="form.status === 'sold' ? 'translate-x-8' : 'translate-x-1'"></span>
              </button>
            </div>
          </div>

          <button type="submit" class="w-full bg-black text-white px-6 py-4 rounded-lg font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
            {{ editingId ? 'Ruaj Ndryshimet' : 'Posto Veturën' }}
          </button>
        </form>

        <div>
          <h2 class="text-xl font-semibold mb-4 text-black border-b pb-2">Menaxho Veturat</h2>
          <ClientOnly>
            <div class="space-y-3 h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="car in cars" :key="car.id" class="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition bg-white" :class="car.status === 'sold' ? 'opacity-60' : ''">
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img :src="car.images[0] || 'https://via.placeholder.com/150'" class="w-20 h-16 object-cover rounded-lg shadow-sm" :class="car.status === 'sold' ? 'grayscale' : ''" />
                    <span v-if="car.status === 'sold'" class="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight">E Shitur</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900">{{ car.brand }} {{ car.model }}</p>
                    <p class="text-sm text-gray-500 font-medium">{{ car.price }}€ • {{ car.year }}</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button @click="editCar(car)" class="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-lg transition" title="Modifiko">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <button @click="openDeleteModal(car)" class="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition" title="Fshij">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmimi i Fshirjes -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="deleteModal.open" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeDeleteModal"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full z-10">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Fshij Veturën</h3>
                <p class="text-gray-500 text-sm mt-0.5">Ky veprim nuk mund të kthehet prapa.</p>
              </div>
            </div>
            <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <img :src="deleteModal.car?.images[0]" class="w-16 h-12 object-cover rounded-lg" />
              <div>
                <p class="font-bold text-gray-900">{{ deleteModal.car?.brand }} {{ deleteModal.car?.model }}</p>
                <p class="text-sm text-gray-500">{{ deleteModal.car?.price?.toLocaleString() }}€ • {{ deleteModal.car?.year }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-6">A jeni të sigurt që doni ta fshini këtë veturë? Të gjitha fotot dhe të dhënat do të humbasin përgjithmonë.</p>
            <div class="flex gap-3">
              <button @click="closeDeleteModal" class="flex-1 px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition">Anulo</button>
              <button @click="confirmDelete" class="flex-1 px-5 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Po, Fshije
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const { cars, addCar, updateCar, deleteCar } = useCars()
const { addToast } = useToast()
const editingId = ref(null)

const form = ref({
  brand: '', model: '', year: 2024, price: 0, km: 0,
  fuel: 'Diesel', transmission: 'Automatik', engine: '', power: '', color: '',
  description: '', images: [], featured: false, status: 'available'
})

const deleteModal = reactive({ open: false, car: null })
const openDeleteModal = (car) => { deleteModal.car = car; deleteModal.open = true }
const closeDeleteModal = () => { deleteModal.open = false; deleteModal.car = null }
const confirmDelete = () => {
  if (!deleteModal.car) return
  deleteCar(deleteModal.car.id)
  addToast('Vetura u fshi me sukses!', 'success')
  closeDeleteModal()
}

const dragFromIndex = ref(null)
const dragOverIndex = ref(null)
const onDragStart = (index) => { dragFromIndex.value = index }
const onDragOver = (index) => { dragOverIndex.value = index }
const onDrop = (toIndex) => {
  const fromIndex = dragFromIndex.value
  if (fromIndex === null || fromIndex === toIndex) return
  const imgs = [...form.value.images]
  const [moved] = imgs.splice(fromIndex, 1)
  imgs.splice(toIndex, 0, moved)
  form.value.images = imgs
}
const onDragEnd = () => { dragFromIndex.value = null; dragOverIndex.value = null }

const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files) return
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => { form.value.images.push(e.target.result) }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => { form.value.images.splice(index, 1) }

const editCar = (car) => {
  editingId.value = car.id
  form.value = { ...car, images: [...car.images], status: car.status || 'available' }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => { editingId.value = null; resetForm() }

const resetForm = () => {
  form.value = { brand: '', model: '', year: 2024, price: 0, km: 0, fuel: 'Diesel', transmission: 'Automatik', engine: '', power: '', color: '', description: '', images: [], featured: false, status: 'available' }
}

const submitCar = () => {
  if (form.value.images.length === 0) { addToast("Ju lutem ngarkoni të paktën një foto!", "error"); return }
  const carData = {
    brand: form.value.brand, model: form.value.model, year: form.value.year,
    price: form.value.price, currency: '€', km: form.value.km,
    fuel: form.value.fuel, transmission: form.value.transmission, color: form.value.color,
    engine: form.value.engine, power: form.value.power, description: form.value.description,
    images: form.value.images, features: ['E sapo shtuar'], status: form.value.status, featured: form.value.featured,
  }
  if (editingId.value) {
    updateCar(editingId.value, carData)
    addToast('Vetura u modifikua me sukses!', 'success')
    editingId.value = null
  } else {
    addCar({ ...carData, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] })
    addToast('Vetura u shtua me sukses!', 'success')
  }
  resetForm()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>