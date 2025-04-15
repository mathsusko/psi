import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  menagerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  menagerName,
  email,
  phone
}: RegisterRestaurantBody) {
  await api.post('/authenticate', {
    restaurantName,
    menagerName,
    email,
    phone
  })
}
