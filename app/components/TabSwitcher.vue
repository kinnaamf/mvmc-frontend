<template>
  <div class="flex justify-center mt-10 mb-24">
    <div ref="tabsContainerRef" class="relative flex gap-4">
      <!-- p-px :style="indicatorStyle" -->
      <div
          class="absolute rounded-full transition-all duration-300 ease-in-out pointer-events-none indicator"

      >
        <div class="w-full h-full rounded-full bg-black/90"></div>
      </div>

      <NuxtLink
          v-for="tab in tabs"
          :to="tab.to" class="tab-link">
        <span>{{ tab.label }}</span>
      </NuxtLink>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from "~/types/tab"

const props = defineProps<{
  tabs: Tab[]
}>()
</script>

<style scoped lang="postcss">
.tab-link {
  @apply transition-all duration-300 ease-in-out;
}

.tab-content {
  @apply block py-4 px-12 rounded-full text-white/70;
  background: transparent;
  box-shadow: 0 0 16px 1px rgba(255, 255, 255, 0) inset;
  transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out 0.15s;
}

.tab-link.active .tab-content {
  @apply text-white;
  box-shadow: 0 0 16px 1px rgba(255, 255, 255, 0.05) inset;
}

.indicator {
  background: linear-gradient(8deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.5) 75%, rgba(0, 0, 0, 1) 100%)
}
</style>