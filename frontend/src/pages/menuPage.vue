<template>
  <div id="v-model-select-dynamic" class="drop--list">
    <select v-model="selected">
      <option value="Все категории">Все категории</option>
      <option v-for="category in categories" :key="category.id" class="option">
        {{ category.title }}
      </option>
    </select>
    <span style="margin-left: 10px; font-size: 20px">Выбрано: {{ selected }}</span>
  </div>
  <div class="container menu">
    <itemCard v-for="item of items" :key="item.id" :item="item"/>
  </div>
  <button class="btn btn-primary" style="margin-bottom: 10px" @click="addItem">Загрузить еще</button>
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
      selected: null,
      page: 1,
      categories: [],
      categoryId: null,
      seeDrop: false,
      items: []
    }
  },
  methods: {
    async addItem(){
      this.page++
      if(this.categoryId){
        await axios.patch(process.env.BACKEND_URL + 'api/items/category', {categoriesId: [this.categoryId]})
            .then(res => {
              this.items = [...this.items, ...res.data.data.items]
            })
            .catch(e => {
              alert('Ошибка запроса')
              console.log(e)
            })
        return
      }
      await axios.get(process.env.BACKEND_URL + 'api/items', {params: {limit: this.limit, page: this.page}})
          .then(res => {
            this.items = [...this.items, ...res.data.data.items]
          })
          .catch(e => {
            alert('Ошибка запроса')
            console.log(e)
          })
    }
  },
  async created() {
    await axios.get(process.env.BACKEND_URL + 'api/items', {params: {limit: this.limit, page: this.page}})
        .then(res => {
          this.items = res.data.data.items
        })
        .catch(e => {
          alert('Ошибка запроса')
          console.log(e)
        })

    await axios.get(process.env.BACKEND_URL + 'api/category')
        .then(res => {
          this.categories = res.data.data.categories
        })
        .catch(e => {
          alert('Ошибка запроса')
          console.log(e)
        })
  },
  watch: {
    async selected(newValue){
      this.page = 1;
      const category = this.categories.find(category => category.title === newValue);
      if(!category) {
        await axios.get(process.env.BACKEND_URL + 'api/items', {params: {limit: this.limit, page: this.page}})
            .then(res => {
              this.items = res.data.data.items
            })
            .catch(e => {
              alert('Ошибка запроса')
              console.log(e)
            })
        this.categoryId = null;
        return;
      }
      this.categoryId = category.id;
      await axios.patch(process.env.BACKEND_URL + 'api/items/category', {categoriesId: [category.id]})
          .then(res => {
            this.items = res.data.data.items
          })
          .catch(e => {
            alert('Ошибка запроса')
            console.log(e)
          })
    }
  }
}
</script>

<style scoped>

</style>