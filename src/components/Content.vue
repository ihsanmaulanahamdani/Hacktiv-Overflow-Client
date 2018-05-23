<template>
  <div class="content container-fluid">
    <div class="flexbox">
      <div class="row">
        <div class="col">
          <div v-for="(question, index) in list_questions" :key="index">
            <div class="card text-center question-box mt-3">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div>{{ question.views }}</div>
                    <div>Views</div>
                  </div>
                  <div class="col">
                    <div>{{ question.answers.length }}</div>
                    <div>Answers</div>
                  </div>
                  <div class="col">
                    <div>{{ question.upVotes.length - question.downVotes.length }}</div>
                    <div>Votes</div>
                  </div>
                  <div class="col col-md-9">
                    <div v-if="token && question.owner._id === userId">
                      <button type="button" @click="deleteQuestion(question._id)" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <a class="no-underline pointer-style" @click="toQuestionField(question)"><h5 class="card-title">{{ question.question }}</h5></a>
                    <p class="card-text">{{ question.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token')
    }
  },
  computed: {
    ...mapState([
      'list_questions'
    ])
  },
  methods: {
    ...mapActions([
      'readQuestions'
    ]),
    toQuestionField (question) {
      this.$router.push({ path: '/question', query: { id: question._id } })
    },
    deleteQuestion (id) {
      let self = this

      axios
        .delete(`http://hacktiv-overflow-server.ihsanmaulanahamdani.club/questions/delete/${id}`, {
          headers: {
            token: self.token,
            owner: self.userId
          }
        })
        .then(response => {
          this.readQuestions()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.readQuestions()
  }
}
</script>
