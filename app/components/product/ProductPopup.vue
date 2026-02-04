<template>
  <div
      class="popup-container px-10 py-8 z-10"
      @click.stop>

    <div class="flex flex-col gap-10">
      <ProductHeader :selected-product="selectedProduct"/>

      <span class="text-container">{{ selectedProduct.description }}</span>

      <ProductAudio :audio-src="selectedProduct.audio_url || '/BAK.wav'"/>

      <div class="flex items-center justify-between gap-4">
        <button
            :class="buttonClasses"
            :style="{ WebkitTapHighlightColor: 'transparent' }"
            :disabled="isLoading"
            @click.prevent="handlePurchase"
            class="font-bold button-container p-3 w-full text-center"
        >
          <span>{{ isLoading ? 'Обработка...' : `Купить   |   ${selectedProduct.price}₽` }}</span>

        </button>
        <button
            @click="$emit('close')"
            class="button-container p-3"
            type="button"
        >
          <IconCross />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";
import IconPlay from "~/components/icons/IconPlay.vue";
import IconCross from "~/components/icons/IconCross.vue";
import IconStop from "~/components/icons/IconStop.vue";
import ProductHeader from "~/components/product/ProductHeader.vue";

const props = defineProps<{
  selectedProduct: Product;
}>()

defineEmits<{
  close: ['close']
}>()

const { userData } = useTelegram()
const { purchaseProduct, isLoading } = useUserPurchases()

const buttonClasses = computed(() => {
  const baseClasses = 'transition-all duration-300 touch-manipulation'
  const touchClasses = 'active:brightness-75'
  const loadingClasses = 'opacity-50 pointer-events-none'

  return isLoading.value ? `${ baseClasses } ${ loadingClasses }` : `${ baseClasses } ${ touchClasses }`
})

const handlePurchase = async () => {
  const result = await purchaseProduct(userData.value.id, props.selectedProduct.id)

  if (result.success) {
    console.log('success')
  }
}
</script>

<style scoped lang="postcss">
.popup-container {
  @apply bg-[#0A0A0A]/80 w-full;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>