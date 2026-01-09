<template>
  <div>

    <header class="transition-all duration-300 ease-in-out overflow-hidden"
            :class="showLogo ? 'mt-8 max-h-32 opacity-100' : 'mt-0 max-h-0 opacity-0'"
    >
      <AppLogo class="text-white"/>
    </header>

    <main class="transition-all duration-300">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </main>

    <footer>
      <AppNavbar/>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-[#030303] px-6 min-h-screen text-white'
  }
})

const route = useRoute()

const showLogo = computed(() => {
  return !route.path.includes('favorites')
})
</script>