<script setup>
const { icon, label, stat } = defineProps({ icon: { required: true }, label: { required: true }, stat: { required: true } })
</script>

<template>
  <div class="p-5 rounded-xl">
    <img :src="icon" :alt="label" class="inline-block mb-4" />
    <h3 class="text-base">{{ label }}</h3>
    <ul class="mb-5">
      <li class="text-3xl font-bold">{{ stat }}</li>
    </ul>
    <slot name="after"></slot>
  </div>
</template>