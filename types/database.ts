export type Order = {
  id: string
  email: string
  customer_name: string | null
  total_amount: number
  currency: string
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled'
  stripe_session_id: string | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: number
  order_id: string
  product_id: string | null
  product_name: string
  quantity: number
  price: number
}

export type ServiceRequest = {
  id: number
  name: string
  email: string
  service_type: string | null
  message: string | null
  status: 'new' | 'reviewing' | 'quoted' | 'closed'
  created_at: string
}
