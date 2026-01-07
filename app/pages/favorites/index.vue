<template>
  <NuxtLayout name="tabs"></NuxtLayout>
</template>

<script setup lang="ts">
provide('tabs', [
  { label: 'Подписки', to: '/favorites' },
  { label: 'Товары', to: '/favorites/items' }
])
</script>