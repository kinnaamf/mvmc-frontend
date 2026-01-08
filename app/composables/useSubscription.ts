import type { Subscription } from "~/types/subscription";

export const useSubscription = () => {
  const api = useApi();

  const subscriptions = useState<Subscription[]>('subscriptions', () => []);

  const loading = ref<boolean>(false);

  const getSubscriptions = async () => {
    if (subscriptions.value.length > 0) return

    loading.value = true;

    try {
      subscriptions.value = await api<Subscription[]>(`/api/v1/subscriptions`);
      console.log(subscriptions.value);
    } catch (error) {
      loading.value = false;
      console.error(error);
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