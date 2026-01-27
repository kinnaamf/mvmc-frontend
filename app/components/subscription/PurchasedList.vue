<template>
  <div class="space-y-3 pb-28">
    <PurchasedSubscription
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :subscription="subscription"/>
  </div>
</template>

<script setup lang="ts">
import type { Subscription } from "~/types/subscription";
import PurchasedSubscription from "~/components/subscription/PurchasedSubscription.vue";

defineProps<{
  subscriptions: Subscription[]
}>()
</script>
