export interface AlertState {
  alert: AlertI | null
}

export interface AlertI {
  type: 'primary' | 'danger' | 'warning'
  message: string
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

// export interface TokenI {
//   token: string | null
// }

// export interface UserID_I {
//   userID: string | null
// }

export interface AuthState {
  token: string | null,
  userID: string | null
}

export interface MessageI {
  isSideBar: boolean
}

export interface RootState {
alert: AlertState,
token: AuthState,
request: RequestState,
message: MessageI
}

export interface QuestionsI {
  title: string,
  text: string,
} 