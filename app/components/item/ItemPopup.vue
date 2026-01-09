<template>
  <div class="card-container px-10 pt-12 pb-8 absolute top-0">
    <div class="flex flex-col gap-10">
      <div class="flex gap-4">
        <img :src="selectedItem.avatar_url" alt="" class="w-16 h-16 rounded-2xl">
        <div class="flex flex-col">
          <span class="text-xl font-bold line-clamp-1">{{ selectedItem.title }}</span>
          <span>{{ selectedItem.username }}</span>
        </div>
      </div>
      <div>
        <span>{{ selectedItem.description }}</span>
      </div>
      <div>
        <div class="bg-[#0A0A0A] rounded-full border pl-4">
          <div class="flex">
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                class="w-full"
            >
            <button class="p-[0.625rem] rounded-full button-play">
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/item";

defineProps<{
  selectedItem: Item;
}>()
</script>

<style scoped lang="postcss">
.button-play {

}
</style>