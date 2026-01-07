<template>
  <NuxtLayout name="tabs">
    <template #tabs>
      <TabSwitcher :tabs="tabs"/>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
provide('tabs', [
  { label: 'Подписки', to: '/' },
  { label: 'Товары', to: '/items' },
])
</script>