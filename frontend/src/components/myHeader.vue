<template>
  <nav class="navbar navbar-dark bg-dark header">
    <button class="btn btn-dark">Создать товар</button>
    <button class="btn btn-dark" @click="this.$router.push('/')">На главную</button>
    <button class="btn btn-dark">Создать категорию</button>
  </nav>
</template>

<script>
export default {
  name: "myHeader"
}
</script>

<style scoped>

</style>