<script setup>
import { RouterLink } from 'vue-router'

const { to, icon, text } = defineProps(['to', 'icon', 'text'])
</script>
<template>
  <RouterLink :to="to" class="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold" activeClass="bg-[--activestate_bg_1]"><i><img :src="icon" /></i><span>{{ text }}</span></RouterLink>
</template>