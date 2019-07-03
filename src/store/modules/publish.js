/**
 * Created by lidy on 2019/4/29.
 */
import * as types from '../types'
import navBar from '@/utils/publishNavBar'

/**
 * 注册
 */
const state = {
  navBar: {
    status: 0
  }
}

const actions = {
  setCurrentNavBarStatus({commit}, num) {
    commit(types.PUBLISH_SET_NAV_BAR_STATUS, num)
  },
}

const getters = {
  getCurrentNavBarText: state => {
    return navBar[state.navBar.status].text
  },
  findStatusIndex: state => text => {
    return navBar.findIndex(item => {
      return item.text === text
    })
  }
}


const mutations = {
  [types.PUBLISH_SET_NAV_BAR_STATUS](state, num) {
    state.navBar.status = num
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
