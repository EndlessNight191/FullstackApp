<template>
  <nav class="navbar navbar-dark bg-dark header">
    <button class="btn btn-primary" @click="dialogVisibleAddItem = true">Создать товар</button>
    <button class="btn btn-dark" @click="this.$router.push('/')">На главную</button>
    <button class="btn btn-primary" @click="dialogVisibleAddCategory = true">Создать категорию</button>
  </nav>
  <dialogAddItem v-model:show="dialogVisibleAddItem"/>
  <dialogAddCategory v-model:show="dialogVisibleAddCategory"/>
</template>

<script>
import dialogAddItem from "@/components/dialogAddItem";
import dialogAddCategory from "@/components/dialogAddCategory";

export default {
  name: "myHeader",
  components: {
    dialogAddItem,
    dialogAddCategory
  },
  data(){
    return{
      dialogVisibleAddItem: false,
      dialogVisibleAddCategory: false
    }
  }
}
</script>

<style scoped>

</style>