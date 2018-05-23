<template>
  <div>
    <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalLogin"><i class="fas fa-sign-in-alt"></i> LOGIN</button>
    <button class="btn btn-outline-primary" data-toggle="modal" data-target="#modalRegister">REGISTER</button>
    <div>
      <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user"></i> Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputEmail">Email</label>
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="inputPassword">Password</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="loginUser">LOGIN</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user"></i> Register</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputname">Name</label>
                  <input type="text" class="form-control" v-model="name" placeholder="Name">
                </div>
                <div class="form-group">
                  <label for="inputEmail">Email</label>
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <label for="inputPassword">Password</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" @click="registerUser">REGISTER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser () {
      let self = this

      axios
        .post('http://hacktiv-overflow-server.ihsanmaulanahamdani.club/register', {
          name: self.name,
          email: self.email,
          password: self.password
        })
        .then(response => {
          if (response.data.user.email) {
            window.location.reload()
          }
        })
        .catch(err => {
          swal({
            position: 'center',
            type: 'warning',
            title: 'please input form correctly and try again',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
    },

    loginUser () {
      let self = this

      axios
        .post('http://hacktiv-overflow-server.ihsanmaulanahamdani.club/login', {
          email: self.email,
          password: self.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('name', response.data.user.name)
            localStorage.setItem('email', response.data.user.email)
            window.location.reload()
          }
        })
        .catch(err => {
          swal({
            position: 'center',
            type: 'warning',
            title: 'email or password wrong',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
    }
  }
}
</script>
