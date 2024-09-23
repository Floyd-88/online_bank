import type {  ActionContext } from "vuex";


import type { AlertI, AlertState, RootState } from "@/types/types";


const alertModule = {
    namespaced: true,
  state: (): AlertState => ({
      alert: null
    }),

  mutations: {
    setAlert(state: AlertState, alert: AlertI) {
      state.alert = alert
    },

    clearAlert(state: AlertState) {
      state.alert = null
    }
  },

  actions: {
    changeAlert({commit}: ActionContext<AlertState, RootState>, alert: AlertI) {
      commit('setAlert', alert)
      setTimeout(() => {
        commit('clearAlert')
      }, 5000)
    }
  },

  getters: {
    getAlert(state: AlertState): AlertI | null {
      return state.alert
    }
  },
}
export default alertModule