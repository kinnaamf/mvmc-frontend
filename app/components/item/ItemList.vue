<template>
  <div class="pb-28">
    <div class="grid grid-cols-2 gap-4">
      <ItemSingle
          v-for="item in items"
          :key="item.id"
          :item="item"
          @click="openPopup(item)"
      />
    </div>

    <Teleport to="#teleports">
      <div
          v-show="selectedItem"
          id="shadow"
          class="popup-shadow px-6"
          @click.self="selectedItem = null"
      >
        <Transition name="slide-up">
          <ItemPopup
              v-if="selectedItem"
              :selected-item="selectedItem"
              @close="selectedItem = null"
              class="backdrop-blur-sm z-[100]"
          />
        </Transition>
      </div>
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

@keyframes slideUpBounce {
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  45% {
    transform: translateY(-8px);
    opacity: 1;
  }
  65% {
    transform: translateY(4px);
  }
  82% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up-enter-active {
  animation: slideUpBounce 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  animation: slideUpBounce 0.35s cubic-bezier(0.7, 0, 0.84, 0) reverse;
}

.popup-shadow {
  @apply fixed w-screen h-screen bg-black/90 top-0 left-0 flex items-center justify-center z-50;
}
</style>
