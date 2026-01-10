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

.slide-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-up-leave-active {
  transition: all 0.3s ease-in;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.popup-shadow {
  @apply fixed w-screen h-screen bg-black/90 top-0 left-0 flex items-center justify-center z-50;
}
</style>
