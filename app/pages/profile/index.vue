<template>
  <div class="mt-12">
    <div v-if="loading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center w-full gap-4 p-4">
      <div class="text-red-500 text-center">
        <p class="font-semibold">{{ error }}</p>
        <p class="text-sm mt-2">Пожалуйста, откройте приложение через Telegram</p>
      </div>
    </div>

    <div v-else-if="userData" class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col gap-3 w-full">
        <div class="flex justify-center">
          <img
              :src="userData?.photo_url || `https://ui-avatars.com/api/?name=${userData?.first_name}+${userData?.last_name}&background=random`"
              :alt="userData?.username"
              class="w-24 h-24 rounded-full object-cover border-2"
          />
        </div>
        <div class="text-center w-full">
          <h2 class="text-xl font-bold">
            @{{ userData?.username || 'no_username' }}
          </h2>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Нет данных пользователя
    </div>
  </div>
</template>

<script setup lang="ts">
const { init, validate, isReady, error, loading, userData } = useTelegram()

onMounted(async () => {
  await init()
  if (isReady.value) {
    await validate()
  }
})
</script>