import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      config: {
        minLoan: 15000,
        maxLoan: 1000000,
        minMonths: 2,
        maxMonths: 12,
        percent: 2.7
      }
    }
  },
  mutations: {
    setConfig (state, payload) {
      state.config = payload
    }
  }
})
