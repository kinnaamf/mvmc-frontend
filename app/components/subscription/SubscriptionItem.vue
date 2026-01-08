<template>
<div class="card-container flex items-center justify-between">
  <div class="flex gap-3 items-center">
    <img :src="subscription.avatar_url" alt=""
         :style="{borderColor: subscription.ring_color}"
         class="w-14 h-14 rounded-full border-2">
    <div class="flex flex-col text-white/90">
      <span class="text-base font-semibold">{{ subscription.title }}</span>
      <span class="-mt-1 text-sm font-light">{{ subscription.username }}</span>
    </div>
  </div>
  <div class="relative p-px rounded-full bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500">
    <div class="bg-neutral-400 rounded-full p-[0.625rem] icon-container">
      <IconPlus/>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { Subscription } from "~/types/subscription";
import IconPlus from "~/components/icons/IconPlus.vue";

defineProps<{
  subscription: Subscription;
}>()
</script>

<style scoped lang="postcss">
.icon-container {
  @apply bg-neutral-800;

  box-shadow: 0 0 4px 0.5px inset rgba(255, 255, 255, 0.1);
}
</style>
