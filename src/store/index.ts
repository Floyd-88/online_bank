import { createStore } from "vuex";
import auth from '@/store/modules/auth.module'
import request from '@/store/modules/request.module'

import type { AlertI, AuthState } from "@/types/types";


const store =  createStore<AuthState>({
  state() {
    return {
      alert: null
    }
  },

  mutations: {
    setAlert(state: AuthState, alert: AlertI) {
      state.alert = alert
    },

    clearAlert(state: AuthState) {
      state.alert = null
    }
  },

  actions: {
    changeAlert({commit}, alert: AlertI) {
      commit('setAlert', alert)
      setTimeout(() => {
        commit('clearAlert')
      }, 5000)
    }
  },

  getters: {
    getAlert(state: AuthState): AlertI | null {
      return state.alert
    }
  },

  modules: {
    auth, 
    request
  }
})
export default store