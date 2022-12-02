<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Загрузить картинку</h3>
      <div class="input-group flex-nowrap btm--margin">
        <span class="input-group-text" id="addon-wrapping">description</span>
        <input type="text" class="form-control" v-model="image" placeholder="description" aria-describedby="addon-wrapping">
      </div>
      <button class="btn btn-primary btm--margin" @click="uploadImage">Загрузить картинку</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Выберите все пункты!!!</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogUploadImage",
  data(){
    return{
      image: '',
      visible: false,
    }
  },
  props: {
    itemId: Number,
    show:{
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.image = '';
      this.$emit('update:show', false)
    },
    uploadImage(){

    }
  }
}
</script>

<style scoped>

</style>