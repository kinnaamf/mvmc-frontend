import type { Subscription } from "~/types/subscription";

export const useSubscriptions = () => {
  const api = useApi();

  const subscriptions = useState<Subscription[]>('subscriptions', () => []);
  const { userData } = useTelegram()

  const loading = ref<boolean>(false);

  const getSubscriptions = async () => {
    if (subscriptions.value.length > 0) return

    loading.value = true;

    try {
      const data = await api<Subscription[]>(`/api/v1/subscriptions?user_id=${userData.value.id}`)
      if (Array.isArray(data)) {
        subscriptions.value = data
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    getSubscriptions,
    subscriptions,
    loading,
  }
}