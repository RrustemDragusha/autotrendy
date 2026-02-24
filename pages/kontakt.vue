<template>
  <div class="py-16 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Na Kontaktoni</h1>
        <p class="text-xl text-gray-500">Jemi këtu për t'ju ndihmuar të gjeni veturën e përsosur.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-8">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-2xl font-bold mb-6">Të Dhënat e Kontaktit</h3>
            <div class="space-y-6">
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-lg">Adresa</h4>
                  <p class="text-gray-600">Bajram Gashi 277–279, 14000 Lipjan, Kosovë</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-lg">Telefoni / Viber / WhatsApp</h4>
                  <p class="text-gray-600">049 934 984</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 class="font-bold text-lg">Email</h4>
                  <p class="text-gray-600">autotrendy2019@gmail.com</p>
                </div>
              </div>

            </div>
          </div>
          <div class="h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-200">
            <iframe
  src="https://www.google.com/maps?q=42.521887,21.147021&z=17&output=embed"
  width="100%"
  height="100%"
  style="border:0;"
  allowfullscreen=""
  loading="lazy">
</iframe>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 class="text-2xl font-bold mb-6">Dërgoni Mesazh</h3>
          
          <form @submit.prevent="handleMessage" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Emri dhe Mbiemri</label>
              <input v-model="form.name" type="text" class="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Numri i Telefonit</label>
              <input v-model="form.phone" type="tel" class="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mesazhi</label>
              <textarea v-model="form.message" rows="5" class="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border focus:bg-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all" required></textarea>
            </div>
            <button type="submit" class="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              Dërgo
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { addToast } = useToast()

const form = ref({
  name: '',
  phone: '',
  message: ''
})

const handleMessage = () => {
  // Thërrasim njoftimin e bukur modern poshtë djathtas
  addToast('Mesazhi u dërgua me sukses! Do t\'ju kontaktojmë së shpejti.', 'success')
  
  // Pastrojmë formën pasi të dërgohet mesazhi
  form.value = {
    name: '',
    phone: '',
    message: ''
  }
}
</script>