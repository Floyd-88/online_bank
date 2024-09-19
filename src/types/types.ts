export interface AuthState {
  alert: AlertI | null
}

export interface AlertI {
  type: 'primary' | 'danger' | 'warning'
  message: string
}

export interface TokenState {
  token: string | null
}

export interface RequestState {
  requests: RequestI[]
}

export interface RequestI {
  id: string
  name: string
  phone: string
  sum: number
  status: 'active' | 'completed' | 'cancelled' | 'pending'
}
