import axios from 'axios'
import type { ActionContext } from 'vuex'
import { error } from '@/utils/error'
import type { RootState, AuthState } from '@/types/types'
const TOKEN_KEY = 'jwt_token'
const USER_ID = 'user_id'

const authModule = {
  namespaced: true,
  state: (): AuthState => ({
    token: localStorage.getItem(TOKEN_KEY),
    userID: localStorage.getItem(USER_ID)
  }),
  mutations: {
    setToken(state: AuthState, token: string) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },

    setUserId(state: AuthState, userID: string) {
      state.userID = userID
      localStorage.setItem(USER_ID, userID)
    },

    logout(state: AuthState) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_ID)
    }
  },

  actions: {
    async login(
      { commit, dispatch }: ActionContext<AuthState, RootState>,
      payload: { email: string; password: string }
    ) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`
        const response = await axios.post(url, { ...payload, returnSecureToken: true })
        const { idToken, localId  } = response.data
        commit('setToken', idToken)
        commit('setUserId', localId)
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
      { commit, dispatch }: ActionContext<AuthState, RootState>,
      payload: { email: string; password: string; name: string; surname: string }
    ) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FB_KEY}`

        const response = await axios.post(url, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
        const { idToken, localId } = response.data

        commit('setToken', idToken)
        commit('setUserId', localId)

        const dbUrl = `https://online-bank-2bdf1-default-rtdb.firebaseio.com/users/${localId}.json?auth=${idToken}`
        await axios.put(dbUrl, {
          name: payload.name,
          surname: payload.surname,
          email: payload.email
        })
        return true
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
        return false
      }
    }
  },
  getters: {
    getToken(state: AuthState) {
      return state.token
    },
    getUserId(state: AuthState) {
      return state.userID
    },
    isAuthenticated(state: AuthState, getters: { getToken: () => string | null }): boolean {
      return !!getters.getToken
    }
  }
}
export default authModule
