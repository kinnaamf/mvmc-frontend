<template>
  <nav class="fixed left-0 right-0 px-6 bottom-4 z-[111111111111]">
    <div class="relative backdrop-blur-sm nav-wrapper">
      <ul class="flex justify-between relative rounded-full py-3 px-3">

        <div
            class="absolute bg-white/30 backdrop-blur-lg rounded-full transition-all duration-300 shadow-lg"
            :style="indicatorStyle"
        ></div>

        <li
            v-for="(link, index) in links"
            :key="link.to"
            ref="linkRefs"
        >
          <NuxtLink :to="link.to" class="nav-link block relative z-10">
            <component :is="link.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import IconHeart from '~/components/icons/IconHeart.vue'
import IconStore from '~/components/icons/IconStore.vue'
import IconUser from '~/components/icons/IconUser.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/favorites/subscriptions', icon: IconHeart },
  { to: '/subscriptions', icon: IconStore },
  { to: '/profile', icon: IconUser },
]

const linkRefs = ref<HTMLElement[]>([])

const indicatorStyle = ref({
  left: '0px',
  width: '0px',
  top: '0px',
  height: '0px',
  opacity: '0',
})

const activeIndex = computed(() => {
  if (route.path.startsWith('/favorites')) return 0
  if (route.path.startsWith('/profile')) return 2
  return 1
})

const updateIndicator = () => {
  const active = linkRefs.value[activeIndex.value]
  if (!active) return

  const rect = active.getBoundingClientRect()
  const parentRect = active.parentElement!.getBoundingClientRect()

  indicatorStyle.value = {
    left: `${rect.left - parentRect.left}px`,
    width: `${rect.width}px`,
    top: `${rect.top - parentRect.top}px`,
    height: `${rect.height}px`,
    opacity: '1',
  }
}

onMounted(async () => {
  await nextTick()
  linkRefs.value = Array.from(document.querySelectorAll('ul > li')) as HTMLElement[]
  updateIndicator()
  window.addEventListener('resize', updateIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator)
})

watch(
    () => route.path,
    async () => {
      await nextTick()
      updateIndicator()
    }
)
</script>

<style scoped lang="postcss">
.nav-wrapper {
  @apply relative p-px rounded-full;
  background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 0.2) 25%,
      rgba(255, 255, 255, 0.2) 75%,
      rgba(0, 0, 0, 1) 100%
  );
}

ul {
  @apply bg-black/80;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.25) inset;
}

.nav-link {
  @apply py-4 px-[2.5rem] transition-all duration-300;
}
</style>
