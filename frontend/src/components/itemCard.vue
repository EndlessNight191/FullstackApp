<template>
  <div class="card card-custom">
    <img :src="linkImage" class="card-img-top" alt="картинка не загрузилась">
    <div class="card-body">
      <h5 class="card-title">{{ item.title }}</h5>
      <p class="card-text">{{item.description}}</p>
      <p class="card-text">price: {{item.price}} $</p>
      <div style="margin: 5px">
        <categoryCard v-for="category in item.categories" :key="category.category.id" :category="category" />
      </div>
      <button class="btn btn-primary" @click="this.$router.push({ path: `/item/${this.item.id}`})">Открыть карточку товара</button>
    </div>
  </div>
</template>

<script>
import categoryCard from "@/components/categoryCard";

export default {
  name: "itemCard",
  components: {
    categoryCard
  },
  props: {
    item: Object
  },
  data(){
    return{
      linkImage: this.item?.image || ''
    }
  }
}
</script>

<style scoped>

</style>