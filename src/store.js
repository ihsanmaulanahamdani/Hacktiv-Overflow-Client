import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list_questions: [],
    list_answers: []
  },
  mutations: {
    getAllQuestion (state, payload) {
      state.list_questions = payload
    },
    getAllAnswer (state, payload) {
      state.list_answers = payload
    }
  },
  actions: {
    readQuestions ({ commit }) {
      axios
        .get('http://hacktiv-overflow-server.ihsanmaulanahamdani.club/questions')
        .then(response => {
          commit('getAllQuestion', response.data.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    readAnswers ({ commit }) {
      axios
        .get('http://hacktiv-overflow-server.ihsanmaulanahamdani.club/answers')
        .then(response => {
          commit('getAllAnswer', response.data.answers)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
