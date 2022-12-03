<template>
  <myHeader />
  <router-view></router-view>
</template>

<script>
import myHeader from './components/myHeader.vue'
import '@/assets/main.css'
import axios from "axios";
import {computed} from "vue";

export default {
  name: 'App',
  components: {
    myHeader
  },
  data(){
    return{
      authAdmin: false
    }
  },
  provide() {
    return {
      authAdmin: computed(() => this.authAdmin)
    }
  },
  async created() {
    const result = prompt('Введите пароль для доступа к добавлению и изменению');
    await axios.post(process.env.BACKEND_URL + 'api/auth', {}, {headers: {authorization: `Bearer ${result}`}})
        .then(() => {
          this.authAdmin = true;
          localStorage.setItem('authToken', JSON.stringify(result));
        })
        .catch(e => {
          alert('Авторизация не удалась')
          console.log(e)
        })
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
