<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <ItemSingle
          v-for="item in items"
          :key="item.id"
          :item="item"
          @click="openPopup(item)"
      />
    </div>

    <Teleport to="#teleports">
      <Transition name="slide-up">
        <ItemPopup
            v-if="selectedItem"
            :selected-item="selectedItem"
            @close="selectedItem = null"
            class="backdrop-blur-sm"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '~/types/item';
import ItemPopup from "~/components/item/ItemPopup.vue";

defineProps<{
  items: Item[];
}>()

const selectedItem = ref<Item | null>(null);

const openPopup = (item: Item) => {
  selectedItem.value = item;
}
</script>

<style scoped lang="postcss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(300px);
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(200px);
}
</style>
