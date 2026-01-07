<template>
  <div class="flex justify-center mt-10 mb-24">
    <div ref="tabsContainerRef" class="relative flex gap-4">

      <div
          v-if="tabs && tabs.length > 0"
          class="absolute rounded-full p-px transition-all duration-300 ease-in-out pointer-events-none"
          :style="indicatorStyle"
      >
        <div class="w-full h-full rounded-full bg-black/90"></div>
      </div>

      <NuxtLink
          v-for="(tab, index) in tabs"
          :key="tab.to"
          :ref="el => setTabRef(el, index)"
          :to="tab.to"
          :class="[
            'tab-link relative z-10',
            { 'active': isActive(tab.to) }
          ]"
      >
        <span class="tab-content">
          {{ tab.label }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

interface Tab {
  label: string
  to: string
}

const props = withDefaults(defineProps<{
  tabs?: Tab[]
}>(), {
  tabs: () => []
})

const route = useRoute()

const tabsContainerRef = ref<HTMLElement | null>(null)
const tabRefs = ref<(ComponentPublicInstance | null)[]>([])

const indicatorStyle = ref({
  left: '0px',
  top: '0px',
  width: '0px',
  height: '0px',
  opacity: '0',
  background: 'linear-gradient(8deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.5) 75%, rgba(0, 0, 0, 1) 100%)'
})

const setTabRef = (el: any, index: number) => {
  if (el) {
    tabRefs.value[index] = el
  }
}

const isActive = (path: string) => {
  return route.path === path
}

const activeIndex = computed(() => {
  if (!props.tabs || props.tabs.length === 0) return -1
  return props.tabs.findIndex(tab => isActive(tab.to))
})

const updateIndicator = () => {
  if (!import.meta.client) return

  const index = activeIndex.value
  if (index === -1 || !tabsContainerRef.value || !props.tabs || props.tabs.length === 0) return

  const activeTab = tabRefs.value[index]
  if (!activeTab) return

  const tabElement = (activeTab as any).$el as HTMLElement
  if (!tabElement || typeof tabElement.getBoundingClientRect !== 'function') return

  const containerRect = tabsContainerRef.value.getBoundingClientRect()
  const tabRect = tabElement.getBoundingClientRect()

  const left = tabRect.left - containerRect.left
  const top = tabRect.top - containerRect.top

  indicatorStyle.value = {
    left: `${ left }px`,
    top: `${ top }px`,
    width: `${ tabRect.width }px`,
    height: `${ tabRect.height }px`,
    opacity: '1',
    background: 'linear-gradient(8deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.5) 75%, rgba(0, 0, 0, 1) 100%)'
  }
}

watch(activeIndex, () => {
  if (import.meta.client) {
    nextTick(() => {
      updateIndicator()
    })
  }
})

watch(() => props.tabs, () => {
  if (import.meta.client) {
    nextTick(() => {
      updateIndicator()
    })
  }
}, { deep: true })

onMounted(() => {
  setTimeout(() => {
    updateIndicator()
  }, 100)

  const handleResize = () => {
    updateIndicator()
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})
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
</style>