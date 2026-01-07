<template>
  <div>
    <header class="mt-8">
      <AppLogo class="text-white"/>
    </header>

    <main>
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
    class: 'bg-[#030303] px-6 min-h-screen'
  }
})
</script>