<template>
<img src="/icon-daptee-mobile.png" alt="Daptee Logo" :width="width" :height="height" />
</template>
<script setup lang="ts">
defineProps({
  width: {
    type: [Number, String],
    default: 120
  },
  height: {
    type: [Number, String],
    default: 40
  }
});
</script>