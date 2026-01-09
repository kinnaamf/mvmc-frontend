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

    <Teleport to="body">
      <ItemPopup
          v-if="selectedItem"
          :selected-item="selectedItem"
          @close="selectedItem = null"
      />
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
