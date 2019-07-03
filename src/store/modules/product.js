import * as types from '../types'

/**
 * 注册
 */
const state = {
  autoConfirm: {
    item: {},
    amount: 0,
  },
  success: {
    expectIncome: "",
    investTime: "",
    interestDesc: "",
    prdPeriodStr: "",
    investAmount: 0
  }
}

const actions = {
  setAutoConfirmAmount({commit}, value) {
    commit(types.PRODUCT_AUTO_SET_AMOUNT, value)
  },
  setConfirmSuccessInfo({commit}, obj) {
    commit(types.CONFIRM_SUCCESS_INFO, obj)
  }
}

const getters = {}


const mutations = {
  [types.PRODUCT_AUTO_SET_AMOUNT](state, value) {
    state.autoConfirm.amount = value
  },
  [types.CONFIRM_SUCCESS_INFO](state, obj) {
    state.success = obj
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
