import * as types from '../types'

/**
 * 注册
 */
const state = {
	isStartCountDown: false
}

const actions = {
	setStartCountDownState({ commit }, status) {
		commit(types.REG_START_COUNT_DOWN_STATUS, status)
	}
}

const getters = {
  isStartCountDown: state => state.isStartCountDown
}


const mutations = {
	[types.REG_START_COUNT_DOWN_STATUS](state, status) {
		state.isStartCountDown = status
	}
}


export default {
	state,
	actions,
	getters,
	mutations
}
