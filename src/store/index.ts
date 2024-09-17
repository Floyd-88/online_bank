import { createStore } from "vuex";
import auth from './modules/auth.modules'
import type { AlertI, RootState } from "@/types/types";


const store =  createStore<RootState>({
  state() {
    return {
      alert: null
    }
  },

  mutations: {
    setAlert(state: RootState, alert: AlertI) {
      state.alert = alert
    },

    clearAlert(state: RootState) {
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
    getAlert(state: RootState): AlertI | null {
      return state.alert
    }
  },

  modules: {
    auth
  }
})
export default store