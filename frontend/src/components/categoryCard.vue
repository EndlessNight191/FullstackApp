<template>
  <button  class="btn btn-dark btm--margin--width" @click="dialogVisibleUpdateCategory=true">{{this.category.category.title}}</button>
  <dialogUpdateCategory v-if="authAdmin.value" v-model:show="dialogVisibleUpdateCategory" :categoryId="category.category.id" :titles="this.category.category.title"/>
</template>

<script>
import dialogUpdateCategory from "@/components/dialogUpdateCategory";

export default {
  name: "categoryCard",
  components:{
    dialogUpdateCategory
  },
  inject: ['authAdmin'],
  props: {
    category: Object
  },
  data(){
    return{
      dialogVisibleUpdateCategory: false
    }
  }
}
</script>

<style scoped>

</style>