import axios from '@/axios/axios'
import store from '../index'
import type { AuthState, RequestI, RequestState } from '@/types/types'
import type { ActionContext } from 'vuex'

const requestModule = {
  namespaced: true,
  state: (): RequestState => ({
    requests: []
  }),

  mutations: {
    setRequests(state: RequestState, requests: RequestI[]) {
      state.requests = requests
    },

    addRequest(state: RequestState, request: RequestI) {
      state.requests.push(request)
    }
  },

  actions: {
    async create({ commit, dispatch }: ActionContext<RequestI, AuthState>, payload: RequestI) {
      try {
        const token = store.getters['auth/getToken']
        const { data } = await axios.post(`/requestAxios.json?auth=${token}`, payload)
        commit('addRequest', { ...payload, id: data.name })
        dispatch(
          'changeAlert',
          {
            message: 'Заявка успешно создана',
            type: 'primary'
          },
          { root: true }
        )
      } catch (e) {
        console.error(e);
        dispatch(
            'changeAlert',
            {
              message: 'Не удалось создать заявку',
              type: 'danger'
            },
            { root: true }
          );
      }
    },

    async load({ commit, dispatch }: ActionContext<RequestState, AuthState>) {
      try {
        const token = store.getters['auth/getToken']
        const { data } = await axios.get(`/requestAxios.json?auth=${token}`)
        const request = Object.keys(data).map((id) => ({...data[id], id}))
        commit('setRequests', request)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          dispatch(
            'changeAlert',
            {
              message: e.message,
              type: 'danger'
            },
            { root: true }
          )
        } else {
          console.error('Произошла неожиданная ошибка')
          dispatch(
            'changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    }
  },
  getters: {
    getRequests(state: RequestState) {
        return state.requests
    }
  }
}
export default requestModule
