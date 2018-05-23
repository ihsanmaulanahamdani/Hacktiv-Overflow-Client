<template>
  <div class="add-question">
    <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalAddQuestion"><i class="fas fa-question"></i></button>
    <div>
      <div class="modal fade" id="modalAddQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleAddQuestion" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleAddQuestion"><i class="fas fa-question"></i> Add Question</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputQuestion">Question</label>
                  <input type="text" class="form-control" v-model="question" placeholder="Question">
                </div>
                <div class="form-group">
                  <label for="inputDescription">Description</label>
                  <input type="text" class="form-control" v-model="description" placeholder="Description">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="addQuestion" data-dismiss="modal">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      question: '',
      description: ''
    }
  },
  methods: {
    addQuestion () {
      let self = this

      axios
        .post('http://hacktiv-overflow-server.ihsanmaulanahamdani.club/questions', {
          question: self.question,
          description: self.description,
          owner: self.id
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
    ...mapActions([
      'readQuestions'
    ])
  }
}
</script>
