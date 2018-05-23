<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.flexbox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.question-box {
  width: 60rem;
}
.pointer-style {
  cursor: pointer;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.no-underline {
  text-decoration: none;
}
</style>
