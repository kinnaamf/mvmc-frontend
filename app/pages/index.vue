<template>

</template>

<script setup lang="ts">
definePageMeta({
  middleware: defineNuxtRouteMiddleware(() => {
    return navigateTo('/subscriptions')
  })
})
</script>