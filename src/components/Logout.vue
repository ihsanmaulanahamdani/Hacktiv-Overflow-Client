<template>
  <div>
    <button class="btn btn-outline-danger" @click="logoutUser"><i class="fas fa-sign-out-alt"></i> LOGOUT</button>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser () {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        window.location.reload()
      }
    }
  }
}
</script>
