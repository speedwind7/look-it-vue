import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userData: null,
    topicList: []
  },
  getters: {
    getLoginState (state) {
      return state.isLogin
    },
    getListData (state) {
      return state.listData
    },
    getItemForIndex: (state) => (index) => {
      return state.listData[index]
    },
    getUserData: (state) => {
      return state.userData
    },
    getUserId: (state) => {
      return state.userData.user_id
    },
    getUserName: (state) => {
      return state.userData.user_name
    },
    getUserAvatat: (state) => {
      console.log(state.userData.avatar)
      return state.userData.avatar
    },
    getTitleName: (satate) => (index) => {
      return satate.topicList.find(v => {
        if (v.topic_id === index) return true
        return false
      }).title
    }
  },
  mutations: {
    login (state, userData) {
      state.isLogin = true
      console.log(userData)
      state.userData = userData
    },
    quit (state) {
      state.isLogin = false
      state.userData = null
      localStorage.removeItem('userName')
    },
    setTopicList (state, data) {
      state.topicList = data.reverse()
    },
    setUserAvatat (state, data) {
      state.userData.avatar = data
    }
  },
  actions: {
    updataTopicList ({ commit }) {
      axios.get(process.env.VUE_APP_APIPATH + process.env.VUE_APP_GETALLTOPICAPI).then((response) => {
        // console.log(response.data)
        commit('setTopicList', response.data)
      })
    }
  },
  modules: {
  }
})
