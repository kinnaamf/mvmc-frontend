export const useTabs = () => {
  const route = useRoute()

  return computed(() => {
    const isFavorites = route.path.startsWith("/favorites")
    const base = isFavorites ? '/favorites' : ''
    return [
      { label: 'Подписки', to: `${base}/subscriptions` },
      { label: 'Товары', to: `${base}/items` },
    ]
  })
}