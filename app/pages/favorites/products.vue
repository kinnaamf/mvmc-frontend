<template>
  <div v-if="!purchasedProducts.length" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <span class="text-white/80 font-medium text-base">Нет купленных товаров</span>
  </div>

  <ProductList :products="purchasedProducts"></ProductList>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tabs'
})

const { purchasedProducts, getProducts, isLoading } = useUserPurchases()

onMounted(async() => {
  await getProducts()
})
</script>