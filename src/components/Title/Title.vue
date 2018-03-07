<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang='stylus'>
  .title
    line-height 14px
    font-size 14px
    color rgb(7, 17, 27)
</style>
