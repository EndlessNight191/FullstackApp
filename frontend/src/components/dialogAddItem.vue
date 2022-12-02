<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Создание товара</h3>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">title</span>
        <input type="text" class="form-control" v-model="item.title" placeholder="title" aria-describedby="addon-wrapping">
      </div>
      <div class="input-group flex-nowrap btm--margin">
        <span class="input-group-text" id="addon-wrapping">description</span>
        <input type="text" class="form-control" v-model="item.description" placeholder="description" aria-describedby="addon-wrapping">
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">$</span>
        <input type="number" class="form-control" v-model="item.price" placeholder="price" aria-describedby="addon-wrapping">
      </div>
      <button class="btn btn-primary btm--margin" @click="addItem">Создать товар</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Выберите все пункты!!!</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogAddItem",
  data(){
    return{
      visible: false,
      item: {
        title: '',
        description: '',
        price: 0
      }
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
      this.item.title = '';
      this.item.description = '';
      this.item.price = 0;
      this.$emit('update:show', false);
    },
    addItem(){

    }
  }
}
</script>

<style scoped>

</style>