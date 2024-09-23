import axios from 'axios'
import type { ActionContext } from 'vuex'
import { error } from '@/utils/error'
import type { TokenI, RootState } from '@/types/types'
const TOKEN_KEY = 'jwt_token'

const authModule = {
  namespaced: true,
  state: (): TokenI => ({
    token: localStorage.getItem(TOKEN_KEY)
  }),
  mutations: {
    setToken(state: TokenI, token: string) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },

    logout(state: TokenI) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },

  actions: {
    async login(
      { commit, dispatch }: ActionContext<TokenI, RootState>,
      payload: { email: string; password: string }
    ) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`
        const response = await axios.post(url, { ...payload, returnSecureToken: true })
        const { idToken } = response.data
        commit('setToken', idToken)
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.response.data.error.message),
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    },

    async register(
      { commit, dispatch }: ActionContext<TokenI, RootState>,
      payload: {  email: string; password: string; name: string; surname: string }
    ) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FB_KEY}`

        const response = await axios.post(url, { email: payload.email, password: payload.password, returnSecureToken: true })
        const { idToken, localId  } = response.data

        commit('setToken', idToken)

        const dbUrl = `https://online-bank-2bdf1-default-rtdb.firebaseio.com/users/${localId}.json?auth=${idToken}`
        await axios.put(dbUrl, {
          name: payload.name,
          surname: payload.surname,
          email: payload.email
        })
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.response.data.error.message),
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    }
  },
  getters: {
    getToken(state: TokenI) {
      return state.token
    },
    isAuthenticated(state: TokenI, getters: { getToken: () => string | null }): boolean {
      return !!getters.getToken
    }
  }
}
export default authModule
