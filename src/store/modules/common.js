import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  loading: false,
  showToast: false,
  showSuccess: true,
  showFail: false,
  toastMsg: '操作成功',
  serviceTel: '400-090-9968',
  serviceTime: '9:00-18:00'
}

const actions = {
  setLoadingState({commit}, status) {
    commit(types.COM_LOADING_STATUS, status)
  },
  showToast({commit}, status) {
    commit(types.COM_SHOW_TOAST, status)
  },
  showSuccess({commit}, status) {
    commit(types.COM_SHOW_SUCCESS, status)
  },
  showFail({commit}, status) {
    commit(types.COM_SHOW_FAIL, status)
  },
  toastMsg({commit}, str) {
    commit(types.COM_TOAST_MSG, str)
  }
}

const getters = {
  loading: state => state.loading
}


const mutations = {
  [types.COM_LOADING_STATUS](state, status) {
    state.loading = status
  },

  [types.COM_SHOW_TOAST](state, status) {
    state.showToast = status
  },

  [types.COM_SHOW_SUCCESS](state, status) {
    state.showSuccess = status
  },

  [types.COM_SHOW_FAIL](state, status) {
    state.showFail = status
  },

  [types.COM_TOAST_MSG](state, str) {
    state.toastMsg = str
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
