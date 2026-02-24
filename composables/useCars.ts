import { ref, onMounted, watch } from 'vue'

// Funksione ndihmëse për të përdorur IndexedDB (Pa limit hapësire për fotot)
const DB_NAME = 'AutoTrendyDB'
const STORE_NAME = 'cars'

const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const saveToDB = async (data: any) => {
  const db = await initDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  tx.objectStore(STORE_NAME).put(JSON.parse(JSON.stringify(data)), 'car_list')
}

const loadFromDB = async () => {
  const db = await initDB()
  return new Promise<any>((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const request = tx.objectStore(STORE_NAME).get('car_list')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
  })
}

export const useCars = () => {
  const { addToast } = useToast()
  
  const staticCars = [
    {
      id: '1',
      brand: 'Mercedes-Benz',
      model: 'A 200 d 4MATIC AMG Line',
      year: 2022,
      price: 27390,
      currency: '€',
      km: 135000,
      fuel: 'Diesel',
      transmission: 'Automatik',
      color: 'E zezë',
      engine: '2.0 TDI',
      power: '150 HP',
      description: 'Mercedes-Benz A 200 d 4MATIC AMG Line në gjendje ekselente. Mundësi këmbimi me veturë. Mundësi blerje përmes bankës. Libri i mirëmbajtjes. Garanci. Shitja jashtë Republikës së Kosovës bëhet pa doganë.',
      images: [
        'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/635607958_1201745191946115_7444359345583286497_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-vaX56RKewYQ7kNvwG1x2dP&_nc_oc=AdnfnKLx38aJ_Dwt06TuYSLoNnvyTqp-Bev8HemLQsIBS2_p_Be4wL7K7G4vD48AvhY&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=DolxHdQ2zJRGkQ7UILEslw&oh=00_AfvuEekF53NzcR3Enx2vONyHq7QcmUqQ6X8DAwZxzN7vBg&oe=699F6D1E'
      ],
      features: ['AMG Line', '4MATIC', 'Mundësi Këmbimi', 'Blerje Bankë', 'Libri Mirëmbajtjes', 'Garanci'],
      status: 'available',
      featured: true,
      createdAt: '2025-01-15',
    },
    {
      id: '2',
      brand: 'Volkswagen',
      model: 'Golf VIII Life 2.0 TDI DSG',
      year: 2023,
      price: 22490,
      currency: '€',
      km: 167000,
      fuel: 'Diesel',
      transmission: 'Automatik',
      color: 'E bardhë',
      engine: '2.0 TDI',
      power: '150 HP',
      description: 'Volkswagen Golf VIII Life 2.0 TDI DSG-automatik në gjendje shumë të mirë.',
      images: [
        'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/635563918_1200109042109730_6938518175280340489_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=IzP0DDuvKCwQ7kNvwH09MnD&_nc_oc=AdkMh0jCXFfWZ3yxjqVuJfn-xpsumZ1Wm2B0OWgFa_msPXLaBStX8z1thW88eLvrT-0&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=Hp8beQlCCliuXzWmdSwAlA&oh=00_Afsa0DcblHmx6Sp0lzdux-ouMnAI3MD1kKnkXOiaxLkdOQ&oe=699F6AF5'
      ],
      features: ['DSG Automatik', 'Life Paketa', 'Mundësi Këmbimi'],
      status: 'available',
      featured: true,
      createdAt: '2025-01-18',
    },
    {
      id: '3',
      brand: 'Audi',
      model: 'Q5 50 TFSIe Quattro',
      year: 2021,
      price: 34900,
      currency: '€',
      km: 166000,
      fuel: 'Hibride',
      transmission: 'Automatik',
      color: 'E zezë',
      engine: '2.0 TFSIe Hybrid',
      power: '299 HP',
      description: 'Audi Q5 50 TFSIe Quattro Plug-in Hybrid.',
      images: [
        'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/633921019_1197403009047000_5945407396882430202_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=5TCqfMUIWz8Q7kNvwH3IUeL&_nc_oc=AdlKmnpIKVqWbFXbLCqTqNvjAyoo-Jhsp9q9JwdPXJL5AXZT46ivTn4CnfldfrpoChI&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=tz5edrtNE0pBvfl6WrkhRw&oh=00_Afs162zaKuUnwTm-RCh9Fl9jPdVFTpElNEsP8B-fIEVWXg&oe=699F5A32'
      ],
      features: ['Plug-in Hybrid', 'Quattro', '1.7L/100km'],
      status: 'available',
      featured: true,
      createdAt: '2025-01-20',
    },
    {
      id: '4',
      brand: 'BMW',
      model: '320d xDrive',
      year: 2022,
      price: 29890,
      currency: '€',
      km: 170000,
      fuel: 'Diesel',
      transmission: 'Automatik',
      color: 'E kaltër',
      engine: '2.0d xDrive',
      power: '190 HP',
      description: 'BMW 320d xDrive 190 kf në gjendje ekselente.',
      images: [
        'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/632305829_1195737572546877_6362412995142867824_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=tHGFoDX9uX8Q7kNvwEuukxA&_nc_oc=AdmYuk9NrqUvMcEhueGJTUaOx5hO5nxR_XOuQ6m-SR25k43KSRO6G9Wy1R7vVsW3lAQ&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=190huILHrEWU3aVsXwLEYA&oh=00_AfuqiNSR265HmXVG0H2j9y3vgN8yHHg-dRB_B-So3xgOtw&oe=699F61AA'
      ],
      features: ['xDrive 4x4', 'Mundësi Këmbimi'],
      status: 'available',
      featured: false,
      createdAt: '2025-01-22',
    },
    {
      id: '5',
      brand: 'BMW',
      model: 'X3 xDrive 30e M Sport',
      year: 2023,
      price: 38700,
      currency: '€',
      km: 177000,
      fuel: 'Hibride',
      transmission: 'Automatik',
      color: 'E zezë',
      engine: '2.0e xDrive Hybrid',
      power: '292 HP',
      description: 'BMW X3 xDrive 30e Charged Edition M Sport Plug-in Hybrid.',
      images: [
        'https://scontent.fprn3-1.fna.fbcdn.net/v/t39.30808-6/629228185_1195082235945744_3201072714563597226_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=D2ey2Wgj-rsQ7kNvwFd2X3K&_nc_oc=Adlp1mCmmkNMhTw_cnicFu98McnoPqMxPM4hPH_dTlkWMQ9_wRmVj2XYpqqA0W9KPSM&_nc_zt=23&_nc_ht=scontent.fprn3-1.fna&_nc_gid=bIkZPyiL6HeMVjWb65X2BQ&oh=00_AftSti2GxlF_KB-9EPGLD4uDsd-H3e9Bx8ttkAa5xbYIvw&oe=699F5CFB'
      ],
      features: ['M Sport', 'Plug-in Hybrid', 'xDrive 4x4'],
      status: 'available',
      featured: true,
      createdAt: '2025-01-25',
    }
  ]

  const cars = ref<any[]>([])

  onMounted(async () => {
    try {
      const storedCars = await loadFromDB()
      if (storedCars && storedCars.length > 0) {
        cars.value = storedCars
      } else {
        cars.value = staticCars
        await saveToDB(staticCars)
      }
    } catch (e) {
      console.error("Gabim gjatë ngarkimit nga DB:", e)
      cars.value = staticCars
    }
  })

  // Ruaj automatikisht çdo ndryshim
  watch(cars, async (newVal) => {
    if (newVal.length > 0) {
      try {
        await saveToDB(newVal)
      } catch (e) {
        console.error("Gabim gjatë ruajtjes:", e)
        addToast("Ndodhi një gabim gjatë ruajtjes.", "error")
      }
    }
  }, { deep: true })

  const addCar = (car: any) => {
    cars.value.unshift(car)
  }

  const updateCar = (id: string, updatedData: any) => {
    const index = cars.value.findIndex(c => c.id === id)
    if (index !== -1) {
      cars.value[index] = { ...cars.value[index], ...updatedData }
    }
  }

  const deleteCar = (id: string) => {
    cars.value = cars.value.filter(c => c.id !== id)
  }

  return { cars, addCar, updateCar, deleteCar }
}