<template>
  <div class="container menu">
    <itemCard v-for="item of items" :key="item.id" />
  </div>
</template>

<script>
import itemCard from '@/components/itemCard'
import axios from "axios";

export default {
  name: "menuPage",
  components: {
    itemCard
  },
  data(){
    return {
      limit: 8,
      page: 1,
      items: []
    }
  },
  created() {
    axios.get(process.env.BACKEND_URL + 'api/items', {params: {limit: this.limit, page: this.page}})
        .then(res => {
          this.items = res.data.data.items
        })
        .catch(e => {
          alert('Ошибка запроса')
          console.log(e)
        })
  }
}
</script>

<style scoped>

</style>