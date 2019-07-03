import * as types from '../types'
import sessionStore from '@/utils/sessionStore'
import localStore from '@/utils/localStore'

/**
 * 购物车
 */
const state = {
  voucherList: [],
  ticketList: [],
  shoppingCartList: [],
  shoppingCartCount: parseInt(sessionStore.get('shoppingCartCount')) || 0,
  currentTime: ""
}

const actions = {
  setVoucherList({commit}, arr) {
    commit(types.SHOP_CART_SET_VOUCHER_LIST, arr)
  },
  setTicketList({commit}, arr) {
    commit(types.SHOP_CART_SET_TICKET_LIST, arr)
  },
  setCouponList({commit}, params) {
    commit(types.SHOP_CART_SET_COUPON_LIST, params)
  },
  setVoucherChecked({commit}, params) {
    commit(types.SHOP_CART_SET_VOUCHER_CHECKED, params)
  },
  setTicketChecked({commit}, params) {
    commit(types.SHOP_CART_SET_TICKET_CHECKED, params)
  },
  setResultList({commit}, params) {
    commit(types.SHOP_CART_SET_RESULT_LIST, params)
  },
  doCancelChecked({commit}, loanId) {
    commit(types.SHOP_CART_DO_CANCEL_CHECKED, loanId)
  },
  doCancelTicketChecked({commit}, loanId) {
    commit(types.SHOP_CART_DO_CANCEL_TICKET_CHECKED, loanId)
  },
  doCancelCurrentProductChecked({commit}, loanId) {
    commit(types.SHOP_CART_DO_CANCEL_CURRENT_PRODUCT_CHECKED, loanId)
  },
  setShoppingCartCount({commit}, count) {
    commit(types.SHOP_CART_SET_COUNT, count)
  }
}

const getters = {
  currentCheckedVoucher: state => loanId => {
    return state.voucherList.find(item => {
      if (item.useId === loanId) {
        return item
      }
    })
  },
  currentCheckedTicket: tate => state.ticketList.find(item => {
    if (item.useId === loanId) {
      return item
    }
  })
}


const mutations = {
  [types.SHOP_CART_SET_VOUCHER_LIST](state, arr) {
    state.voucherList = arr
  },
  [types.SHOP_CART_SET_TICKET_LIST](state, arr) {
    state.ticketList = arr
  },
  [types.SHOP_CART_SET_COUPON_LIST](state, params) {
    state.voucherList = params.voucherList
    state.ticketList = params.ticketList
  },
  [types.SHOP_CART_SET_VOUCHER_CHECKED](state, params) {
    state.ticketList.forEach(item => {
      if (item.useId === params.loanId) {
        item.useId = ''
      }
    })
    let item = state.voucherList.forEach(item => {
      if (item.awardDtlId === params.awardDtlId) {
        item.useId = params.loanId
      }
    })
  },
  [types.SHOP_CART_SET_TICKET_CHECKED](state, params) {
    state.voucherList.forEach(item => {
      if (item.useId === params.loanId) {
        item.useId = ''
      }
    })
    state.ticketList.forEach(item => {
      if (item.awardDtlId === params.awardDtlId) {
        item.useId = params.loanId
      } else if (item.useId === params.loanId) {
        item.useId = ''
      }
    })
  },
  [types.SHOP_CART_DO_CANCEL_CHECKED](state, loanId) {
    state.voucherList.forEach(item => {
      if (item.useId === loanId) {
        item.useId = ''
      }
    })
    state.ticketList.forEach(item => {
      if (item.useId === loanId) {
        item.useId = ''
      }
    })
  },
  [types.SHOP_CART_DO_CANCEL_CURRENT_PRODUCT_CHECKED](state, loanId) {
    state.voucherList.forEach(item => {
      if (item.useId === loanId) {
        item.useId = ''
      }
    })
    state.ticketList.forEach(item => {
      if (item.useId === loanId) {
        item.useId = loanId
      }
    })
  },
  [types.SHOP_CART_DO_CANCEL_TICKET_CHECKED](state, loanId) {
    state.ticketList.forEach(item => {
      if (item.useId === loanId) {
        item.useId = loanId
      }
    })
  },
  [types.SHOP_CART_SET_RESULT_LIST](state, params) {
    state.shoppingCartList = params.list
    state.currentTime = params.time
  },
  [types.SHOP_CART_SET_COUNT](state, count) {
    state.shoppingCartCount = count
    sessionStore.set('shoppingCartCount', count)
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
