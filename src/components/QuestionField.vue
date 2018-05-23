<template>
  <div class="content flexbox">
    <div class="row">
      <div class="col">
        <div v-for="(question, index) in list_questions" :key="index">
          <div v-if="questionId === question._id">
            <div class="card text-center question-box mt-3">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="pointer-style" @click="upVoteQuestion(question._id)"><i class="fas fa-chevron-up"></i></div>
                    <div>{{ question.upVotes.length - question.downVotes.length }}</div>
                    <div class="pointer-style" @click="downVoteQuestion(question._id)"><i class="fas fa-chevron-down"></i></div>
                  </div>
                  <div class="col col-md-10">
                    <h5 class="card-title">{{ question.question }}</h5>
                    <p class="card-text">{{ question.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row">
      <div class="col">
        <div v-for="(answer, index) in list_answers" :key="index">
          <div v-if="questionId === answer.questionId">
            <div class="card text-center question-box mt-3">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="pointer-style" @click="upVoteAnswer(answer._id)"><i class="fas fa-chevron-up"></i></div>
                    <div>{{ answer.upVotes.length - answer.downVotes.length }}</div>
                    <div class="pointer-style" @click="downVoteAnswer(answer._id)"><i class="fas fa-chevron-down"></i></div>
                  </div>
                  <div class="col col-md-10">
                    <div v-if="userId === answer.owner._id">
                      <button type="button" @click="deleteAnswer(answer._id, answer.questionId)" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <p class="card-text">{{ answer.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

     <div class="row">
      <div class="col">
        <div class="card text-center question-box mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col col-md-10">
                <textarea rows="3" v-model="answer" class="col"></textarea>
              </div>
              <div class="col">
                <button class="col btn btn-success" @click="inputAnswer" style="height: 5rem;">Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      questionId: '',
      answer: '',
      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token')
    }
  },
  computed: {
    ...mapState([
      'list_questions',
      'list_answers'
    ])
  },
  methods: {
    ...mapActions([
      'readAnswers',
      'readQuestions'
    ]),
    inputAnswer () {
      let self = this
      
      axios
        .post('http://localhost:3000/answers', {
          answer: self.answer,
          owner: self.userId,
          questionId: self.questionId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          self.answer = ''
          this.readAnswers()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAnswer (id, queId) {
      let self = this

      axios
        .delete(`http://localhost:3000/answers/delete/${id}`, {
          headers: {
            token: self.token,
            owner: self.userId,
            questionId: queId
          }
        })
        .then(response => {
          this.readAnswers()
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVoteQuestion (id) {
      let self = this

      axios
        .put(`http://localhost:3000/questions/upvote/${id}`, {
          owner: self.userId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          this.readQuestions()
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteQuestion (id) {
      let self = this

      axios
        .put(`http://localhost:3000/questions/downvote/${id}`, {
          owner: self.userId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          this.readQuestions()
        })
        .catch(err => {
          console.log(err)
        })
    },
    upVoteAnswer (id) {
      let self = this

      axios
        .put(`http://localhost:3000/answers/upvote/${id}`, {
          owner: self.userId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          this.readAnswers()
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteAnswer (id) {
      let self = this

      axios
        .put(`http://localhost:3000/answers/downvote/${id}`, {
          owner: self.userId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          this.readAnswers()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.readAnswers()
    this.readQuestions()
  },
  created () {
    this.questionId = this.$route.query.id
  }
}
</script>

<style scoped>
.div-answer {
  width: 60rem;
}
</style>
