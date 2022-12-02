<template>
  <div class="card card-custom" style="width: 18rem;">
    <img :src="linkImage" class="card-img-top" alt="картинка не загрузилась">
    <div class="card-body">
      <h5 class="card-title">Название карточки</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <div>категории</div>
      <button class="btn btn-primary" @click="this.$router.push({ path: `/item/${this.item.id}`})">Go somewhere</button>
    </div>
  </div>
</template>

<script>


export default {
  name: "itemCard",
  components: {

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