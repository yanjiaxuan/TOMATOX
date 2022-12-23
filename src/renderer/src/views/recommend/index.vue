<template>
  <full-container>
    <div>Recommend: {{ num }}</div>
    <n-button @click="addNum">增加</n-button>
  </full-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(123)

function addNum() {
  num.value++
}
</script>
