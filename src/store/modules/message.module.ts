import type { MessageI } from "@/types/types"

const messageModule = {
    namespaced: true,
  state: (): MessageI => ({
      isSideBar: false
    }),

  mutations: {
    setIsSideBar(state: MessageI) {
      state.isSideBar = !state.isSideBar
    },
  },

  actions: {
  },

  getters: {
    getIsSideBar(state: MessageI) {
      return state.isSideBar
    }
  },
}
export default messageModule