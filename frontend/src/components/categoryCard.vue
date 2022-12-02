<template>
  <button  class="btn btn-dark" @click="dialogVisibleUpdateCategory=true">{{this.category.category.title}}</button>
  <dialogUpdateCategory v-model:show="dialogVisibleUpdateCategory"/>
</template>

<script>
import dialogUpdateCategory from "@/components/dialogUpdateCategory";

export default {
  name: "categoryCard",
  components:{
    dialogUpdateCategory
  },
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