<template>
  <nav class="mb-4 px-4">
    <div class="nav-wrapper backdrop-blur-sm">
      <ul class="relative flex items-center justify-between py-3 px-3 shadow-xl w-full rounded-full bg-neutral-900">

        <div
            class="absolute backdrop-blur-lg bg-white/40 shadow-lg rounded-full transition-all duration-300 ease-in-out border border-white/50"
            :style="indicatorStyle"
        ></div>

        <NuxtLink
            :to="{ name: 'favorite' }"
            class="nav-link">
          <IconHeart/>
        </NuxtLink>

        <NuxtLink
            :to="{ name: 'index' }"
            class="nav-link">
          <IconStore/>
        </NuxtLink>

        <NuxtLink
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

const containerRef = ref(null)

const routeIndexMap = {
  'favorite': 0,
  'index': 1,
  'profile': 2,
}

const activeIndex = computed(() => routeIndexMap[route.name] ?? 2)

console.log(routeIndexMap)

const indicatorStyle = computed(() => {
  const positions = [
    { left: '12px' }, // favorite
    { left: 'calc(50% - 50px)' }, // index
    { left: 'calc(100% - 112px)' }, // profile
  ]

  return {
    ...positions[activeIndex.value],
    width: '100px',
    height: '50px',
    top: '12px'
  }
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

.nav-link {
  @apply transition-all duration-300 py-4 px-[2.5rem] relative z-10;
}
</style>