export interface AlertState {
  alert: AlertI | null
}

export interface AlertI {
  type: 'primary' | 'danger' | 'warning'
  message: string
}

export interface TokenI {
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



export interface RootState {
alert: AlertI,
token: TokenI,
request: RequestI
}

export interface QuestionsI {
  title: string,
  text: string,
} 