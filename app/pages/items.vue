<template>
  <ItemList :items="items"></ItemList>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tabs'
})

const { items, loading, getItems } = useItems()

onMounted(async () => {
  await getItems()
})
</script>