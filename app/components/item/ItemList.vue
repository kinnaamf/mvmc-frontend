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
      <Transition name="fade">
        <div v-if="selectedItem" class="popup-shadow px-6" @click="selectedItem = null">
          <Transition name="slide-up" appear>
            <div v-if="selectedItem">
              <ItemPopup
                  :selected-item="selectedItem"
                  @close="selectedItem = null"
                  class="backdrop-blur-sm z-50"
              />
            </div>
          </Transition>
        </div>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: bounce-in-top .9s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-leave-active {
  animation: slide-out-bottom 0.3s ease-out;
}

@keyframes bounce-in-top {
  0% {
    opacity: 0;
    transform: translateY(100vh);
  }
  50% {
    opacity: 1;
    transform: translateY(-15px);
  }
  75% {
    transform: translateY(5px);
  }
  90% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slide-out-bottom {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100vh);
  }
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100vh);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100vh);
}

.popup-shadow {
  @apply fixed w-screen h-screen bg-black/90 top-0 left-0 flex items-center justify-center z-50;
}
</style>
