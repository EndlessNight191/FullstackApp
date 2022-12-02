<template>
  <div class="container item-page">
    <itemCard v-if="see" :item="item"/>
    <div class="btn-item--page">
      <button class="btn btn-primary btm--margin" @click="dialogVisibleUpdateItem=true">Изменить товар</button>
      <button class="btn btn-primary btm--margin" @click="dialogVisibleUploadImage=true">Загрузить картинку</button>
    </div>
  </div>
  <dialogUpdateItem  :item="item" v-model:show="dialogVisibleUpdateItem"/>
  <dialogUploadImage :itemId="item.id" v-model:show="dialogVisibleUploadImage"/>
</template>

<script>
import itemCard from "@/components/itemCard";
import axios from "axios";
import dialogUpdateItem from "@/components/dialogUpdateItem";
import dialogUploadImage from "@/components/dialogUploadImage";


export default {
  name: "itemPage",
  components: {
    itemCard,
    dialogUpdateItem,
    dialogUploadImage
  },
  data(){
    return{
      dialogVisibleUpdateItem: false,
      dialogVisibleUploadImage: false,
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