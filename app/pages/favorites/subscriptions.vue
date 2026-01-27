<template>
  <div v-if="purchasedSubscriptions.length === 0" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <span class="text-white/80 font-medium text-base">Нет активных подписок</span>
  </div>
  <PurchasedList :subscriptions="subscriptions"/>
</template>

<script setup lang="ts">
import PurchasedList from "~/components/subscription/PurchasedList.vue";

definePageMeta({
  layout: 'tabs'
})

const { purchasedSubscriptions } = useUserPurchases()
const { subscriptions } = useSubscriptions()
</script>