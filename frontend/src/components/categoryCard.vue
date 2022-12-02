<template>
<button class="btn btn-dark">{{this.category.category.title}}</button>
</template>

<script>
export default {
  name: "categoryCard",
  props: {
    category: Object
  }
}
</script>

<style scoped>

</style>