<template>
  <div class="mt-12">
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col gap-3">
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFb9q4YTo6wXrUBm1qz7c3jfc47rclFLEVQ&s" alt="" class="w-24 h-24 rounded-full object-cover" />
        </div>
        <div>
          <span class="font-medium">@username</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, initData, isReady } = useTelegram()

watch(isReady, (ready) => {
  if (ready) {
    console.log('User: ', user.value)
    console.log('InitData: ', initData)
  }
})

watchEffect(() => {
  if (user.value) {
    console.log('User loaded: ', user.value)
  }
})

</script>


<style scoped lang="postcss">

</style>