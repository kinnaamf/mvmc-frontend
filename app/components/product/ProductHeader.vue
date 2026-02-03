<template>
  <div class="flex gap-4">
    <img
        :src="selectedProduct.avatar_url"
        alt=""
        class="w-16 h-16 rounded-2xl">

    <div class="flex flex-col">
      <span class="text-xl font-bold line-clamp-1">{{ selectedProduct.title }}</span>
      <span>{{ selectedProduct.username }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from "~/types/product";

  defineProps<{
    selectedProduct: Product
  }>()
</script>