<template>
  <div class="pb-28">
    <div class="grid grid-cols-2 gap-4">
      <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          @click="openPopup(product)"
      />
    </div>

    <Teleport to="#teleports">
      <div
          v-show="selectedProduct"
          id="shadow"
          class="popup-shadow px-6"
          @click.self="selectedProduct = null"
      >
        <Transition name="slide-up">
          <ProductPopup
              v-if="selectedProduct"
              :selected-product="selectedProduct"
              @close="selectedProduct = null"
              class="backdrop-blur-sm z-[100]"
          />
        </Transition>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';
import ProductPopup from "~/components/product/ProductPopup.vue";

defineProps<{
  products: Product[];
}>()

const selectedProduct = ref<Product | null>(null);

const openPopup = (product: Product) => {
  selectedProduct.value = product;
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
