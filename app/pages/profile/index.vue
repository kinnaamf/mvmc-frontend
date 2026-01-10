<template>
  <div class="mt-12">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col gap-3 w-full">
        <div class="flex justify-center">
          <img :src="userData?.photo_url" alt="" class="w-24 h-24 rounded-full object-cover border-2" />
        </div>
        <div class="text-center w-full">
          <span class="font-medium">@{{ userData?.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { init, validate, isReady, error, loading, userData } = useTelegram()

await init()

watch(isReady, async (ready) => {
  if (ready) {
    await validate()
  }
}, {immediate: true})
</script>


<style scoped lang="postcss">

</style>