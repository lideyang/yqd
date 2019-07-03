/**
 * Created by lidy on 2019/4/29.
 */
import * as types from '../types'

/**
 * 注册
 */
const state = {
  navBar: {
    list: [],
    status: 0
  }
}

const actions = {
  setHelpNavBarStatus({commit}, num) {
    commit(types.HELP_CENTER_SET_NAV_BAR_STATUS, num)
  },
  setHelpNavBarList({commit}, list) {
    commit(types.HELP_CENTER_SET_NAV_BAR_LIST, list)
  },
}

const getters = {
  findHelpStatusIndex: state => typeId => {
    return state.navBar.list.findIndex(item => {
      return item.typeId === typeId
    })
  }
}


const mutations = {
  [types.HELP_CENTER_SET_NAV_BAR_STATUS](state, num) {
    state.navBar.status = num
  },
  [types.HELP_CENTER_SET_NAV_BAR_LIST](state, list) {
    state.navBar.list = list
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
