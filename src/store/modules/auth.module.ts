import axios from 'axios'
import type { Module, ActionContext } from 'vuex';
import {error} from '@/utils/error'
import type { TokenState, AuthState } from '@/types/types';
const TOKEN_KEY = 'jwt_token'


const authModule: Module<TokenState, AuthState> = {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY)
  },
  mutations: {
    setToken(state: TokenState, token: string) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },

    logout(state) {
        state.token = null
        localStorage.removeItem(TOKEN_KEY)
    }
  },

  actions: {
    async login({ commit, dispatch }: ActionContext<TokenState, AuthState> , payload: { email: string; password: string }) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`
        const response = await axios.post(url, { ...payload, returnSecureToken: true })
        const { idToken } = response.data
        commit('setToken', idToken)
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            dispatch('changeAlert', {
                message: error(e.response.data.error.message),
                type: 'danger'
            }, {root: true})
        }
      }
    },

    async register({ commit, dispatch }: ActionContext<TokenState, AuthState>, payload: { email: string; password: string }) {
        try {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FB_KEY}`;
          
          const response = await axios.post(url, { ...payload, returnSecureToken: true });
          const { idToken } = response.data;
          
          commit('setToken', idToken);
        } catch (e) {
          if (axios.isAxiosError(e) && e.response) {
            dispatch('changeAlert', {
              message: error(e.response.data.error.message),
              type: 'danger'
            }, { root: true });
          }
        }
      }      

  },
  getters: {
    getToken(state: TokenState) {
      return state.token
    },
    isAuthenticated(state: TokenState, getters: { getToken: () => string | null }): boolean {
      return !!getters.getToken
    }
  }
}
export default authModule