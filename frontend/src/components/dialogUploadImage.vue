<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>Загрузить картинку</h3>
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="inputGroupFile02" accept="image/jpeg" @change=changeUploadImage >
        <label class="input-group-text" for="inputGroupFile02">Загрузка</label>
      </div>
      <button class="btn btn-primary btm--margin" @click="uploadImage">Загрузить картинку</button>
      <h3 v-if="visible" style="color: purple; margin: 10% auto; width: 50%; font-size: 25px">Выберите отя бы один файл</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    async changeUploadImage(e){
      this.image = e.target.files[0]
    },
    async uploadImage(){
      if(!this.image){
        this.visible = true;
        return
      }
      let data = new FormData();
      data.append('image', this.image);
      await axios.put(process.env.BACKEND_URL + `api/items/image/${this.itemId}`, data)
          .then(() => {
            this.image = ''
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