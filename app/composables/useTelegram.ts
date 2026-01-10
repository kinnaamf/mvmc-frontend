export const useTelegram = () => {
  const tg = ref<any>(null);
  const user = ref<any>(null);
  const initData = ref<string>('');

  onMounted(() => {

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      tg.value = window.Telegram.WebApp;
      tg.value.ready()

      user.value = tg.value.initDataUnsafe?.user;
      initData.value = tg.value.initData

      tg.value.expand()
    }
  })

  return {
    tg,
    user,
    initData,
  }
}