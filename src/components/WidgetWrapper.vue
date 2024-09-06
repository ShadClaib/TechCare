<script setup>

const { title, decorate } = defineProps({ title: {}, decorate: { default: true } })

</script>

<template>
  <section class="bg-white shadow rounded-xl">
    <header v-if="decorate" class="flex items-center justify-between p-5">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <slot name="menu"></slot>
    </header>
    <slot name="content"></slot>
  </section>
</template>