<template>
  <ProductList :products="products.filter(p => !p.is_purchased)"></ProductList>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tabs'
})

const { products, loading, getProducts } = useProducts()

onMounted(async () => {
  await getProducts()
})
</script>