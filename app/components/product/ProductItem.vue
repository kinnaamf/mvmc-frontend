<template>
  <div class="card-container px-5 py-8 cursor-pointer">
    <div class="flex justify-center">
      <img :src="product.avatar_url" alt="" class="w-16 h-16 rounded-2xl">
    </div>
    <div class="mt-4 flex flex-col">
      <span class="font-bold text-base line-clamp-1">{{ product.title }}</span>
      <span class="text-sm">{{ product.username }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

defineProps<{
  product: Product
}>()
</script>

<style scoped lang="postcss">

</style>