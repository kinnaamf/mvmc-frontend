<template>
  <div class="space-y-3">
    <SubscriptionItem
        v-for="subscription in subscriptions"
        :key="subscription.id"
        :subscription="subscription"/>
  </div>
</template>

<script setup lang="ts">
import type { Subscription } from "~/types/subscription";

defineProps<{
  subscriptions: Subscription[]
}>()
</script>
