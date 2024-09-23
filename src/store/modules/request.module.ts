import axios from '@/axios/axios'
import store from '../index'
import type { RequestI, RequestState, RootState } from '@/types/types'
import type { ActionContext } from 'vuex'
import { error } from '@/utils/error'

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
    },

    filterRequest(state: RequestState, id: string) {
      state.requests = state.requests.filter((req) => req.id !== id)
    },
  },

  actions: {
    async create({ commit, dispatch }: ActionContext<RequestState, RootState>, payload: RequestI) {
      try {
        const token = store.getters['auth/getToken']
        const { data } = await axios.post(`/requestAxios.json?auth=${token}`, payload)
        commit('addRequest', { ...payload, id: data.name })
        dispatch(
          'alert/changeAlert',
          {
            message: 'Заявка успешно создана',
            type: 'primary'
          },
          { root: true }
        )
      } catch (e) {
        console.error(e)
        dispatch(
          'alert/changeAlert',
          {
            message: 'Не удалось создать заявку',
            type: 'danger'
          },
          { root: true }
        )
      }
    },

    async load({ commit, dispatch }: ActionContext<RequestState, RootState>) {
      try {
        const token = store.getters['auth/getToken']
        const { data } = await axios.get(`/requestAxios.json?auth=${token}`)
        if (data) {
          const request = Object.keys(data).map((id) => ({ ...data[id], id }))
          commit('setRequests', request)
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.message),
              type: 'danger'
            },
            { root: true }
          )
        } else {
          dispatch(
            'alert/changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    },

    async loadOneRequest({ dispatch }: ActionContext<RequestState, RootState>, id: string) {
      try {
        const token = store.getters['auth/getToken']
        const { data } = await axios.get(`/requestAxios/${id}.json?auth=${token}`)
        return data
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.message),
              type: 'danger'
            },
            { root: true }
          )
        } else {
          dispatch(
            'alert/changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    },

    async removeRequest({ commit, dispatch }: ActionContext<RequestState, RootState>, id: string) {
      try {
        if (id) {
          const token = store.getters['auth/getToken']
          const response = await axios.delete(`/requestAxios/${id}.json?auth=${token}`)
          if (response.status === 200) {
            commit('filterRequest', id)
            dispatch(
              'alert/changeAlert',
              {
                message: 'Заявка удалена',
                type: 'primary'
              },
              { root: true }
            )
          }
        } else {
          dispatch(
            'alert/changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.message),
              type: 'danger'
            },
            { root: true }
          )
        } else {
          dispatch(
            'alert/changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      }
    },

    async updateRequest({ dispatch }: ActionContext<RequestState, RootState>,
      request: RequestI
    ) {
      try {
        if (request) {
          const token = store.getters['auth/getToken']
          const response = await axios.put(`/requestAxios/${request.id}.json?auth=${token}`, request
          )
          if (response.status === 200) {
            dispatch(
              'alert/changeAlert',
              {
                message: 'Заявка обновлена',
                type: 'primary'
              },
              { root: true }
            )
          }
        } else {
          dispatch(
            'alert/changeAlert',
            {
              message: 'Произошла неожиданная ошибка',
              type: 'danger'
            },
            { root: true }
          )
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatch(
            'alert/changeAlert',
            {
              message: error(e.message),
              type: 'danger'
            },
            { root: true }
          )
        } else {
          dispatch(
            'alert/changeAlert',
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
