<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Создание товара</h3>
      <button @click="addCategory">Создать категорию</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Выберите все пункты!!!</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogAddCategory",
  data(){
    return{
      visible: false,
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
      this.$emit('update:show', false)
    },
    addCategory(){

    }
  }
}
</script>

<style scoped>

</style>