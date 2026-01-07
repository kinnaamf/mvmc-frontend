<template>

</template>

<script setup lang="ts">
definePageMeta({
  middleware: defineNuxtRouteMiddleware(() => {
    return navigateTo('/favorites/subscriptions')
  })
})
</script>