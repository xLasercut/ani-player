<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({})
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
</style>