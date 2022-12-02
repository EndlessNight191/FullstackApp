<template>
  <div class="container item-page">
    <itemCard :item="item"/>
  </div>
</template>

<script>
import itemCard from "@/components/itemCard";
import axios from "axios";

export default {
  name: "itemPage",
  components: {
    itemCard
  },
  data(){
    return{
      item: ''
    }
  },
  async created() {
    await axios.get(process.env.BACKEND_URL + `api/items/${this.$route.params.id}`)
        .then(res => {
          console.log(res)
          this.item = res.data.data.item
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