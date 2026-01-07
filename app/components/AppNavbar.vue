<template>
  <nav class="mb-4 px-4 nav">
    <div class="nav-wrapper backdrop-blur-sm">
      <ul ref="navRef" class="relative flex items-center justify-between py-3 px-3 shadow-xl w-full rounded-full">

        <div
            class="absolute backdrop-blur-lg bg-white/30 shadow-lg rounded-full transition-all duration-300 ease-in-out"
            :style="indicatorStyle"
        ></div>

        <NuxtLink
            ref="link0"
            :to="{ name: 'favorites' }"
            class="nav-link">
          <IconHeart/>
        </NuxtLink>

        <NuxtLink
            ref="link1"
            :to="{ name: 'index' }"
            class="nav-link">
          <IconStore/>
        </NuxtLink>

        <NuxtLink
            ref="link2"
            :to="{ name: 'profile' }"
            class="nav-link">
          <IconUser/>
        </NuxtLink>

      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import IconHeart from "~/components/icons/IconHeart.vue";
import IconUser from "~/components/icons/IconUser.vue";
import IconStore from "~/components/icons/IconStore.vue";

const route = useRoute()

const navRef = ref<HTMLElement | null>(null)
const link0 = ref<ComponentPublicInstance | null>(null)
const link1 = ref<ComponentPublicInstance | null>(null)
const link2 = ref<ComponentPublicInstance | null>(null)

const indicatorStyle = ref({
  left: '0px',
  width: '0px',
  height: '50px',
  top: '12px',
  opacity: '0'
})

const routeIndexMap: Record<string, number> = {
  'favorites': 0,
  'index': 1,
  'profile': 2,
}

const activeIndex = computed(() => routeIndexMap[route.name as string] ?? 1)

const updateIndicator = (index: number) => {
  // Проверяем, что мы на клиенте
  if (!process.client) return

  const links = [link0.value, link1.value, link2.value]
  const activeLink = links[index]

  if (!activeLink || !navRef.value) return

  // Получаем DOM элемент из компонента NuxtLink
  const linkElement = (activeLink as any).$el as HTMLElement
  if (!linkElement || typeof linkElement.getBoundingClientRect !== 'function') return

  const navRect = navRef.value.getBoundingClientRect()
  const linkRect = linkElement.getBoundingClientRect()

  // Вычисляем позицию относительно контейнера
  const left = linkRect.left - navRect.left
  const width = linkRect.width

  indicatorStyle.value = {
    left: `${left}px`,
    width: `${width}px`,
    height: '50px',
    top: '12px',
    opacity: '1'
  }
}

watch(activeIndex, (newIndex) => {
  if (import.meta.client) {
    nextTick(() => {
      updateIndicator(newIndex)
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    updateIndicator(activeIndex.value)
  }, 100)

  const handleResize = () => {
    updateIndicator(activeIndex.value)
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped lang="postcss">
.nav-wrapper {
  @apply relative p-px rounded-full;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 1) 0%,
  rgba(255, 255, 255, 0.2) 25%,
  rgba(255, 255, 255, 0.2) 75%,
  rgba(0, 0, 0, 1) 100%
  );
}

ul {
  @apply bg-black/80;
  box-shadow: 0 0 30px 1px rgba(0,0,0,0.25) inset;
}

.nav-link {
  @apply transition-all duration-300 py-4 px-[2.5rem] relative z-10;
}
</style>