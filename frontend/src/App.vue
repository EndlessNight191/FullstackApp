<template>
  <myHeader />
  <router-view></router-view>
</template>

<script>
import myHeader from './components/myHeader.vue'
import '@/assets/main.css'

export default {
  name: 'App',
  components: {
    myHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 100%;
  min-height: 100vh;
  background-color: #212529;
}
</style>
