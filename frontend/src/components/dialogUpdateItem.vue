<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Создание товара</h3>
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
      <button class="btn btn-primary btm--margin" @click="updateItem">Обновить товар</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogUpdateItem",
  data(){
    return{
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
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
    updateItem(){

    }
  }
}
</script>

<style scoped>

</style>