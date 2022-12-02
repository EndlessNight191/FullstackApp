<template>
  <div class="container item-page">
    <itemCard v-if="see" :item="item"/>
    <div class="btn-item--page">
      <button class="btn btn-primary btm--margin">Изменить карточку товара</button>
      <button class="btn btn-primary btm--margin">Загрузить картинку</button>
    </div>
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
      item: '',
      see: false
    }
  },
  async created() {
    await axios.get(process.env.BACKEND_URL + `api/items/${this.$route.params.id}`)
        .then(res => {
          this.see = true
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