export const useTelegram = () => {
  const tg = ref<any>(null)
  const user = ref<any>(null)
  const initData = ref<string>('')
  const isReady = ref<boolean>(false)

  const initTelegram = () => {
    if(typeof window !== 'undefined' && window.Telegram?.WebApp) {
      tg.value = window.Telegram.WebApp
      tg.value.ready()

      user.value = tg.value.initDataUnsafe?.user || null
      initData.value = tg.value.initData || ''

      tg.value.expand()
      isReady.value = true

      console.log('Telegram WebApp initialized: ', {
        user: user.value,
        initData: initData.value,
      })
    }
  }

  onMounted(() => {
    if(window.Telegram?.WebApp) {
      initTelegram()
    } else {
      const checkTelegram = setInterval(() => {
        if(window.Telegram?.WebApp) {
          clearInterval(checkTelegram)
          initTelegram()
        }
      }, 100)

      setTimeout(() => {
        clearInterval(checkTelegram)
        console.log('Telegram SDK not loaded')
      }, 5000)
    }
  })

  return {
    tg,
    user,
    initData,
    isReady,
  }
}