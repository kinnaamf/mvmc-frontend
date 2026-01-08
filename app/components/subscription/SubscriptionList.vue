<template>
<div class="space-y-3">
  <div v-for="subscription in subscriptions">
    <SubscriptionItem :subscription="subscription" />
  </div>
</div>
</template>

<script setup lang="ts">
import type { Subscription } from "~/types/subscription";

defineProps<{
  subscriptions: Subscription[]
}>()
</script>
