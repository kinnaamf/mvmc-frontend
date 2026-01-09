import type { Item } from "~/types/item";

export const useItems = () => {
  const api = useApi();

  const items = useState<Item[]>('items', () => []);

  const loading = ref<boolean>(false);

  const getItems = async() => {
    if (items.value.length > 0) return

    loading.value = true;

    try {
      items.value = await api<Item[]>(`/api/v1/orders`)
    } catch (error) {
      loading.value = false;
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  return {
    getItems,
    items,
    loading,
  }
}