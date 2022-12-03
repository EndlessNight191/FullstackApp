<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Обновление товара</h3>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">title</span>
        <input type="text" class="form-control" v-model="items.title" placeholder="title" aria-describedby="addon-wrapping">
      </div>
      <div class="input-group flex-nowrap btm--margin">
        <span class="input-group-text" id="addon-wrapping">description</span>
        <input type="text" class="form-control" v-model="items.description" placeholder="description" aria-describedby="addon-wrapping">
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">$</span>
        <input type="number" class="form-control" v-model="items.price" placeholder="price" aria-describedby="addon-wrapping">
      </div>
      <span>Если вы выберите хоть одну категорию, то существующие удаляться, все выбранные категории добавляются к товару</span>
      <div id="v-model-select-dynamic" class="drop--list">
        <select v-model="selected">
          <option value="Все категории">Все категории</option>
          <option v-for="category in categories" :key="category.id" class="option">
            {{ category.title }}
          </option>
        </select>
        <span style="margin-left: 10px; font-size: 20px">Выбрано: {{ selected }}</span>
      </div>
      <button class="btn btn-primary btm--margin" @click="updateItem">Обновить товар</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">У вас пусто</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dialogUpdateItem",
  data(){
    return{
      selected: '',
      categories: [],
      items: this.item,
      visible: false,
    }
  },
  props: {
    item: Object,
    show:{
      type: Boolean,
      default: false,
    },
  },
  async created() {
    await axios.get(process.env.BACKEND_URL + 'api/category')
        .then(res => {
          this.categories = res.data.data.categories
        })
        .catch(e => {
          alert('Ошибка запроса')
          console.log(e)
        })
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
    async updateItem(){
      if(!this.item.title || !this.item.description || !this.item.price){
        this.visible = true
        return
      }

      const itemData = {
        title: this.items.title,
        description: this.items.description,
        price: this.items.price,
      };
      if(this.items.categoriesId) itemData.categoriesId = this.items.categoriesId;
      const headers = {headers: {authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`}};
      await axios.put(process.env.BACKEND_URL + `api/items/${this.item.id}`, itemData, headers)
          .then(() => {
            this.$emit('update:show', false);
            this.$router.go(this.$router.currentRoute);
          })
          .catch(e => {
            alert('запрос с ошибкой')
            console.log(e)
          })
    }
  },
  watch: {
    selected(newValue){
      const category = this.categories.find(category => category.title === newValue);
      this.items.categoriesId = this.items.categoriesId ? [...this.items.categoriesId, category.id] : [category.id]
    }
  }
}
</script>

<style scoped>

</style>