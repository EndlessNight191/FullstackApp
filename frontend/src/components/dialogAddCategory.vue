<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Создание товара</h3>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">title</span>
        <input type="text" class="form-control" v-model="title" placeholder="title" aria-label="Пицца" aria-describedby="addon-wrapping">
      </div>
      <button class="btn btn-primary btm--margin" @click="addCategory">Создать категорию</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Выберите все пункты!!!</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dialogAddCategory",
  data(){
    return{
      visible: false,
      title: ''
    }
  },
  props: {
    show:{
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.title = ''
      this.$emit('update:show', false)
    },
    async addCategory(){
      await axios.post(process.env.BACKEND_URL + 'api/category', {title: this.title})
          .then(() => {
            this.title = ''
            this.$emit('update:show', false)
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