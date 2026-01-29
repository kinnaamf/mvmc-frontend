<template>
  <div v-if="purchasedItems.length === 0" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <span class="text-white/80 font-medium text-base">Нет купленных товаров</span>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tabs'
})

const { purchasedItems } = useUserPurchases()
</script>