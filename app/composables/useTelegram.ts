const initData = ref<string>('')
const user = ref<any>(null)
const isReady = ref(false)
const webApp = ref<any>(null)
const error = ref<string>('')
const loading = ref(true)
const userData = ref<any>(null)

let initPromise: Promise<any> | null = null

export const useTelegram = () => {

  const init = async () => {
    if (isReady.value) {
      return {
        initData: initData.value,
        user: user.value,
        webApp: webApp.value
      }
    }

    if (initPromise) {
      return initPromise
    }

    if (!process.client) {
      return null
    }

    const waitForTelegram = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        let attempts = 0
        const maxAttempts = 50

        const check = () => {
          if (window.Telegram?.WebApp) {
            resolve(window.Telegram.WebApp)
          } else if (attempts < maxAttempts) {
            attempts++
            setTimeout(check, 100)
          } else {
            reject(new Error('Telegram WebApp not loaded'))
          }
        }

        check()
      })
    }

    initPromise = (async () => {
      try {
        webApp.value = await waitForTelegram()
        webApp.value.ready()
        webApp.value.expand()

        initData.value = webApp.value.initData || ''
        user.value = webApp.value.initDataUnsafe?.user || null
        isReady.value = true

        console.log('Telegram WebApp initialized:', {
          hasInitData: !!initData.value,
          initDataLength: initData.value.length,
          user: user.value,
          fullInitDataUnsafe: webApp.value.initDataUnsafe
        })

        if (import.meta.dev && (!user.value || initData.value === 'user')) {
          console.warn('⚠️ No real Telegram data, using mock for development')
          user.value = {
            id: 123456789,
            first_name: 'Test',
            last_name: 'User',
            username: 'testuser',
            language_code: 'ru'
          }
          initData.value = 'mock_init_data_for_dev'
        }

        return {
          initData: initData.value,
          user: user.value,
          webApp: webApp.value
        }
      } catch (err) {
        console.error('Telegram WebApp initialization failed:', err)
        error.value = 'Failed to initialize Telegram WebApp'

        if (import.meta.dev) {
          console.warn('⚠Using mock data in development mode')
          user.value = {
            id: 123456789,
            first_name: 'Dev',
            last_name: 'User',
            username: 'devuser',
            language_code: 'en'
          }
          initData.value = 'mock_init_data'
          isReady.value = true

          return {
            initData: initData.value,
            user: user.value,
            webApp: webApp.value
          }
        }

        return null
      } finally {
        initPromise = null
      }
    })()

    return initPromise
  }

  const validate = async () => {
    if (!isReady.value) {
      await init()
    }

    loading.value = true
    error.value = ''

    if (!initData.value || initData.value === 'mock_init_data' || initData.value === 'mock_init_data_for_dev') {
      loading.value = false

      if (import.meta.dev) {
        console.warn('Skipping validation in dev mode with mock data')
        userData.value = user.value
        return true
      }

      error.value = 'App must be opened in Telegram'
      return false
    }

    try {
      const api = useApi()
      const response: any = await api('/api/v1/validateInitData', {
        method: 'POST',
        body: { initData: initData.value }
      })

      userData.value = response.user || user.value
      console.log('✅ User validated:', userData.value)
      return true
    } catch (e: any) {
      error.value = e?.data?.message || 'Validation error'
      console.error('Validation failed:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    initData: readonly(initData),
    userData: readonly(userData),
    user: readonly(user),
    isReady: readonly(isReady),
    webApp: readonly(webApp),
    error: readonly(error),
    loading: readonly(loading),
    validate,
    init
  }
}