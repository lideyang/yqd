import * as types from '../types'
import sessionStore from '@/utils/sessionStore'
import localStore from '@/utils/localStore'

/**
 * 注册
 */
const state = {
  name: sessionStore.get('userName'),
  id: sessionStore.get('userInfo'),
  realName: sessionStore.get('realName'),
  depositoryStatus: sessionStore.get('depositoryStatus') == 'true' ? true : false,
  assessStatus: sessionStore.get('assessStatus') == '1' ? true : false,
  accountAmt: 0,
  mobile: sessionStore.get('userMobile')
}

const actions = {
  setUserName({commit}, name) {
    commit(types.USER_SET_NAME, name)
  },
  setUserID({commit}, id) {
    commit(types.USER_SET_ID, id)
  },
  setRealName({commit}, name) {
    commit(types.USER_SET_REAL_NAME, name)
  },
  setUserAssessStatus({commit}, status) {
    commit(types.USER_SET_ASSESS_STATUS, status)
  },
  setUserDepositaryStatus({commit}, status) {
    commit(types.USER_SET_DEPOSITARY_STATUS, status)
  },
  setAccountAmt({commit}, value) {
    commit(types.USER_SET_ACCOUNT_AMT, value)
  },
  setMobile({commit}, value) {
    commit(types.USER_SET_MOBILE, value)
  },
  clearUserInfo({commit}) {
    commit(types.USER_CLEAR_INFO)
  },
  setALLInfo({commit}, data) {
    commit(types.USER_SET_ALL_INFO, data)
  }
}

const getters = {
  getUserName: state => state.name,
  getUserID: state => state.id,
  isLogin: state => {
    if (!state.id || state.id == 'false') {
      return false
    }
    return true
  }
}


const mutations = {
  [types.USER_SET_NAME](state, name) {
    state.name = name
    sessionStore.set('userName', name)
  },
  [types.USER_SET_ID](state, id) {
    state.id = id
    sessionStore.set('userInfo', id)
  },
  [types.USER_SET_REAL_NAME](state, name) {
    state.name = name
    sessionStore.set('realName', name)
  },
  [types.USER_SET_ASSESS_STATUS](state, status) {
    state.assessStatus = status
    sessionStore.set('assessStatus', status ? '1' : '0')
  },
  [types.USER_SET_DEPOSITARY_STATUS](state, status) {
    state.depositoryStatus = status
    sessionStore.set('depositoryStatus', status)
  },
  [types.USER_SET_ACCOUNT_AMT](state, value) {
    state.accountAmt = value
  },
  [types.USER_SET_MOBILE](state, value) {
    state.mobile = value
    sessionStore.set('userMobile', value)
  },
  [types.USER_CLEAR_INFO](state) {
    state.accountAmt = 0
    state.name = ""
    state.id = ""
    state.realName = ""
    state.mobile = ''
    state.depositoryStatus = false
    state.assessStatus = false
    sessionStore.set('userName', '')
    sessionStore.set('userInfo', 'false')//false表示确认后台没登录
    sessionStore.set('realName', '')
    sessionStore.set('assessStatus', '0')
    sessionStore.set('depositoryStatus', false)
  },
  [types.USER_SET_ALL_INFO](state, data) {
    state.accountAmt = data.availableAmt
    state.name = data.nickName
    state.id = "ok"
    state.realName = data.nickName
    state.mobile = data.userPhone
    state.depositoryStatus = data.isDepositary
    state.assessStatus = data.riskAss ? true : false
    sessionStore.set('userName', data.nickName)
    sessionStore.set('userInfo', 'ok')
    sessionStore.set('realName', data.nickName)
    sessionStore.set('userMobile', data.userPhone)
    sessionStore.set('assessStatus', data.riskAss ? '1' : '0')
    sessionStore.set('depositoryStatus', data.isDepositary)
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
