<template>
  <PurchasedList

      :subscriptions="subscriptions.filter(s => s.is_purchased)"/>

  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <span class="text-white/80 font-medium text-base">Нет активных подписок</span>
  </div>
</template>

<script setup lang="ts">
import PurchasedList from "~/components/subscription/PurchasedList.vue";

definePageMeta({
  layout: 'tabs'
})

const { subscriptions } = useSubscriptions()
const { purchasedSubsriptions, getSubscriptions } = useUserPurchases()

onMounted(async () => {
  await getSubscriptions()
})
</script>