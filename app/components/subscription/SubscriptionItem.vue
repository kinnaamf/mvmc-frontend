<template>
  <div class="card-container py-3 px-[1.125rem] transition-all duration-300 ease-in-out overflow-hidden"
       :class="{ 'min-h-[5.125rem]': !showContent }"
       @click="showContent = !showContent">
    <div class="flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <img :src="subscription.avatar_url" alt=""
             :style="{borderColor: subscription.ring_color}"
             class="w-14 h-14 rounded-full border-2">
        <div class="flex flex-col text-white/90">
          <span class="text-base font-semibold">{{ subscription.title }}</span> <span class="-mt-1 text-sm font-light">{{
            subscription.username
                                                                                                                       }}</span>
        </div>
      </div>
      <div class="relative p-px rounded-full bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500">
        <div class="bg-neutral-400 rounded-full p-[0.625rem] icon-container">
          <IconPlus/>
        </div>
      </div>
    </div>

    <div class="content-wrapper" :class="{'content-open': showContent}">
      <div class="mt-4 w-full">
        <div class="flex justify-between">
          <div class="w-2/3">
            <span>{{ subscription.description }}</span>
          </div>
          <div>
            <div class="price-badge">
              <h4 class="text-sm font-bold">{{ subscription.price }}₽<span class="font-medium">/мес</span></h4>
            </div>
          </div>
        </div>
        <div class="mt-6 text-center button-container w-full">
          <a @click.prevent @click.stop href="#" class="uppercase font-bold"> Подписаться </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Subscription } from "~/types/subscription";
import IconPlus from "~/components/icons/IconPlus.vue";

const showContent = ref(false);

defineProps<{
  subscription: Subscription;
}>()
</script>

<style scoped lang="postcss">
.icon-container {
  @apply bg-neutral-800;

  box-shadow: 0 0 4px 0.5px inset rgba(255, 255, 255, 0.1);
}

.content-wrapper {
  @apply max-h-0 opacity-0 overflow-hidden;
  transition: max-height .3s ease-in-out, opacity .3s ease-in-out;
}

.content-wrapper.content-open {
  max-height: 500px;
  opacity: 1;
}
</style>
