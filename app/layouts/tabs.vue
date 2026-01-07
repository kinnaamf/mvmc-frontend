<script setup lang="ts">
const tabs = [
  { label: 'Подписки', to: '/' },
  { label: 'Товары', to: '/items' },
  // { label: '', to: '/favorites' },
  // { label: '', to: '/favorites/items' },
]
</script>

<template>
  <div>
    <div class="">
      <TabSwitcher :tabs="tabs"/>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>