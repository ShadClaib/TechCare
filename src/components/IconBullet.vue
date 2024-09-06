<script setup>
const { icon, label, text } = defineProps(['icon', 'label', 'text'])
</script>
<template>
  <div class="inline-flex items-center space-x-5">
    <img :src="icon" :alt="label" />
    <div>
      <span class="block">{{ label }}</span>
      <strong>{{ text }}</strong>
    </div>
  </div>
</template>