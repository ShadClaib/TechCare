<script setup>
const { photo, photo2x, name, title } = defineProps({photo:{},photo2x:{},name:{},title:{},after:{default:false}})
</script>
<template>
  <div class="inline-flex flex-nowrap items-center space-x-3">
    <picture>
      <source media="(min-width:650px)" :srcset="photo2x"/>
      <img :src="photo" :alt="name" class="max-w-11" />
    </picture>
    <div>
      <strong class="block">{{ name }}</strong>
      <span>{{ title }}</span>
    </div>
    <div v-if="after" class="grow flex items-center justify-end">
      <slot name="after"></slot>
    </div>
  </div>
</template>