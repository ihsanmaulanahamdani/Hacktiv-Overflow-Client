<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Hacktiv Overflow</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      </ul>
      <div v-if="isLogin">
        <div class="form-inline">
          <AddQuestion/>
          <Logout/>
        </div>
      </div>
      <div v-else>
        <Login/>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import AddQuestion from '@/components/AddQuestion.vue'

export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    Login,
    Logout,
    AddQuestion
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>
