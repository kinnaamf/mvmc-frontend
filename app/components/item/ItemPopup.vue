<template>
  <div class="popup-shadow" @click="$emit('close')">
    <div class="popup-container px-10 pt-4 pb-8 backdrop-blur-sm z-10" @click.stop>
      <div class="flex justify-end" @click="$emit('close')">
        <a href="#" @click.prevent class="button-container p-1 mb-3">
          <IconCross class="scale-90"/>
        </a>
      </div>
      <div class="flex flex-col gap-10">
        <div class="flex gap-4">
          <img :src="selectedItem.avatar_url" alt="" class="w-16 h-16 rounded-2xl">
          <div class="flex flex-col">
            <span class="text-xl font-bold line-clamp-1">{{ selectedItem.title }}</span> <span>{{
              selectedItem.username
                                                                                               }}</span>
          </div>
        </div>
        <div>
          <span>{{ selectedItem.description }}</span>
        </div>
        <div>
          <div class="audio-container">
            <div class="flex items-center">
              <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full"
              > <a href="#" @click.prevent class="button-play">
              <IconPlay/>
            </a>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="button-container w-full py-3 text-center">
            <a href="#" @click.prevent class="button-container uppercase font-bold">Купить</a>
          </div>
          <h4 class="text-sm font-bold w-1/2">{{ selectedItem.price }}₽<span class="font-medium">/мес</span></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/item";
import IconPlay from "~/components/icons/IconPlay.vue";
import IconCross from "~/components/icons/IconCross.vue";

defineProps<{
  selectedItem: Item;
}>()

defineEmits<{
  close: ['close']
}>()
</script>

<style scoped lang="postcss">
.audio-container {
  @apply bg-[#0A0A0A] rounded-full border border-white/10 pl-4;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

.button-play {
  @apply inline-block rounded-full relative z-20 p-[0.625rem]  ml-6;
  background: linear-gradient(135deg, #132222 0%, #041313 100%);
}

.button-play::before {
  @apply rounded-full pointer-events-none;

  content: '';
  position: absolute;
  inset: 0;

  padding: 1px;

  background: linear-gradient(60deg, #4f5e5e 0%, #1a2e25 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;

  mask-composite: exclude;
}

.popup-shadow {
  @apply absolute w-screen min-h-screen bg-black/70 top-0 left-0 flex items-center justify-center;
}

.popup-container {
  @apply bg-[#0A0A0A]/80;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

input[type="range"] {
  appearance: none;
  height: 5px;
  @apply rounded-full;
}

input[type="range"]::-webkit-slider-thumb {
  @apply rounded-full;

  -webkit-appearance: none;
  appearance: none;
  width: 5px;
  height: 20px;
  background:
      radial-gradient(
          circle at top,
          rgba(255,255,255,0.9),
          rgba(255,255,255,0.4) 40%,
          rgba(255,255,255,0.1) 60%,
          rgba(255,255,255,0.05)
      );
  box-shadow:
      inset 0 2px 4px rgba(255,255,255,0.6),
      inset 0 -3px 6px rgba(0,0,0,0.4),
      0 6px 16px rgba(0,0,0,0.6);
  cursor: pointer;
}

</style>