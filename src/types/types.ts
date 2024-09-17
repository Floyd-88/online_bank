export interface RootState {
  alert: AlertI | null
}

export interface AlertI {
  type: 'primary' | 'danger' | 'warning'
  message: string
}

export interface AuthState {
    token: string | null;
  }