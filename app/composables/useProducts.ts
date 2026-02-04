import type { Product } from "~/types/product";

export const useProducts = () => {
  const api = useApi();

  const products = useState<Product[]>('products', () => []);
  const { userData } = useTelegram()


  const loading = ref<boolean>(false);

  const getProducts = async() => {
    if (products.value.length > 0) return

    loading.value = true;

    try {
      products.value = await api<Product[]>(`/api/v1/products?user_id=${userData.value.id}`)
    } catch (error) {
      loading.value = false;
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  return {
    getProducts,
    products,
    loading,
  }
}