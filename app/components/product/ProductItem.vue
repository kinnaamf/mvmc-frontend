<template>
  <div class="card-container px-5 py-8 cursor-pointer">
    <div class="flex justify-center">
      <img :src="item.avatar_url" alt="" class="w-16 h-16 rounded-2xl">
    </div>
    <div class="mt-4 flex flex-col">
      <span class="font-bold text-base line-clamp-1">{{ item.title }}</span>
      <span class="text-sm">{{ item.username }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/item";

defineProps<{
  item: Item
}>()
</script>

<style scoped lang="postcss">

</style>