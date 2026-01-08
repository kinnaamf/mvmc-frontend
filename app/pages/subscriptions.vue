<template>
<!--  {{ $route.path }}-->

<SubscriptionList :subscriptions="subscriptions"/>
</template>

<script setup lang="ts">
import SubscriptionList from "~/components/subscription/SubscriptionList.vue";

definePageMeta({
  layout: 'tabs'
})

const { subscriptions, getSubscriptions, loading } = useSubscription()

onMounted(async () => {
  await getSubscriptions()
})
</script>