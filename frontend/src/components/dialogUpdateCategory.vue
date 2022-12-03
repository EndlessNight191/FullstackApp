<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Обновить категорию</h3>
      <div class="input-group flex-nowrap btm--margin">
        <span class="input-group-text" id="addon-wrapping">title</span>
        <input type="text" class="form-control" v-model="title" placeholder="title" aria-describedby="addon-wrapping">
      </div>
      <button class="btn btn-primary btm--margin" @click="updateItem">Обновить категорию</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Вы ничего не изменили</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dialogUpdateCategory",
  data(){
    return{
      visible: false,
      title: this.titles
    }
  },
  props: {
    titles: String,
    categoryId: Number,
    show:{
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
    async updateItem(){
      if(this.title === this.titles){
        this.visible = true
        return
      }
      const headers = {headers: {authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`}};
      await axios.put(process.env.BACKEND_URL + `api/category/${this.categoryId}`, {title: this.title}, headers)
          .then(() => {
            this.title = '';
            this.$emit('update:show', false);
            this.$router.go(this.$router.currentRoute);
          })
          .catch(e => {
            alert('запрос с ошибкой')
            console.log(e)
          })
    }
  }
}
</script>

<style scoped>

</style>