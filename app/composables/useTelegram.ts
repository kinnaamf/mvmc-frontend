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

    if (!import.meta.client) {
      return null
    }

    const waitForTelegram = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        console.log('🔍 Checking for Telegram SDK...')
        console.log('window.Telegram:', window.Telegram)
        console.log('window.Telegram?.WebApp:', window.Telegram?.WebApp)

        let attempts = 0
        const maxAttempts = 50

        const check = () => {
          if (window.Telegram?.WebApp) {
            console.log('✅ Telegram SDK found!')
            console.log('🔍 WebApp object keys:', Object.keys(window.Telegram.WebApp))
            console.log('🔍 Raw initData:', window.Telegram.WebApp.initData)
            console.log('🔍 Raw initDataUnsafe:', window.Telegram.WebApp.initDataUnsafe)
            resolve(window.Telegram.WebApp)
          } else if (attempts < maxAttempts) {
            attempts++
            console.log(`⏳ Attempt ${attempts}/${maxAttempts}`)
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

        console.log('🔍 Telegram WebApp Debug:', {
          hasInitData: !!initData.value,
          initDataLength: initData.value.length,
          initDataValue: initData.value,
          user: user.value,
          fullInitDataUnsafe: webApp.value.initDataUnsafe,
          allWebAppKeys: Object.keys(webApp.value),
          platform: webApp.value.platform,
          version: webApp.value.version
        })

        const hasRealTelegramData =
          user.value &&
          typeof user.value.id === 'number' &&
          initData.value.length > 10 &&
          initData.value !== 'user'

        if (!hasRealTelegramData) {
          console.warn('No valid Telegram data detected')

          if (import.meta.dev) {
            console.warn('Using mock data for development')
            user.value = {
              id: 123456789,
              first_name: 'Test',
              last_name: 'User',
              username: 'testuser',
              language_code: 'ru',
              photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test'
            }
            initData.value = 'mock_init_data_for_dev'
          } else {
            error.value = 'This app must be opened through Telegram'
            isReady.value = false
            return null
          }
        }

        isReady.value = true

        console.log('Telegram initialized with user:', user.value)

        return {
          initData: initData.value,
          user: user.value,
          webApp: webApp.value
        }
      } catch (err) {
        console.error('Telegram WebApp initialization failed:', err)
        error.value = 'Failed to initialize Telegram WebApp'

        if (import.meta.dev) {
          console.warn('Fallback to mock data in development mode')
          user.value = {
            id: 987654321,
            first_name: 'Dev',
            last_name: 'User',
            username: 'devuser',
            language_code: 'en',
            photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev'
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

    // Если инициализация не удалась
    if (!isReady.value) {
      loading.value = false
      return false
    }

    loading.value = true
    error.value = ''

    const isMockData = ['mock_init_data', 'mock_init_data_for_dev'].includes(initData.value)

    if (isMockData) {
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
      console.log('User validated:', userData.value)
      return true
    } catch (e: any) {
      error.value = e?.data?.message || 'Validation error'
      console.error('Validation failed:', e)

      if (import.meta.dev) {
        console.warn('Using local user data after validation error')
        userData.value = user.value
        return true
      }

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