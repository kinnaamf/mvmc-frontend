<template>
  <SubscriptionList :subscriptions="subscriptions"/>
</template>

<script setup lang="ts">
import SubscriptionList from "~/components/subscription/SubscriptionList.vue";

definePageMeta({
  layout: 'tabs'
})

const { subscriptions, getSubscriptions, loading } = useSubscriptions()

onMounted(async () => {
  await getSubscriptions()
})
</script>