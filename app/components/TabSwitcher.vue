<template>
  <div class="flex justify-center mt-10 mb-16">
    <div ref="containerRef" class="relative flex gap-20">

      <div class="active-indicator" :style="indicatorStyle"></div>

      <NuxtLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="tab-link"
          active-class="tab-link-active"
      >
        {{ tab.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from "~/types/tab"

const route = useRoute()

const props = defineProps<{
  tabs: Tab[]
}>()

const containerRef = ref<HTMLElement>()

const indicatorStyle = ref({
  left: '-40px',
})

onMounted(() => {
  if (!import.meta.client) return
  if (!containerRef.value) return

  console.log(route.path)

  setTimeout(() => {
  }, 1)
})

watch(() => route.path, () => {
  route.path.includes('items') ? indicatorStyle.value.left = '110px' : indicatorStyle.value.left = '-40px'
})
</script>

<style scoped lang="postcss">
.tab-link {
  @apply w-max
}

.active-indicator {
  @apply absolute w-[9.375rem] h-[3.125rem] pointer-events-none top-1/2 -translate-y-1/2 transition-all duration-300 -z-10 rounded-full bg-white/5;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.25) inset;
  border: 1px solid rgba(255,255,255,0.13);
  border-top-color: rgba(255,255,255,0.15);
  border-left-color: rgba(255,255,255,0.18);
}
</style>