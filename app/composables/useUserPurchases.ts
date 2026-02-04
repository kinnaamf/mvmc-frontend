import type { Product } from "~/types/product";
import type { Subscription } from "~/types/subscription";

export const useUserPurchases = () => {
  const purchasedProducts = useState<Product[]>('purchasedProducts', () => []);
  const purchasedSubscriptions = useState<Subscription[]>('purchasedSubscriptions', () => []);

  const { products, getProducts } = useProducts();
  const api = useApi()
  const isLoading = ref<boolean>(false);

  const computedPurchasedProducts = computed(() => {
    return products.value.filter(p => p.is_purchased)
  })

  watchEffect(() => {
    purchasedProducts.value = computedPurchasedProducts.value
  })

  const purchaseProduct = async (userId: number, productId: number) => {
   isLoading.value = true;

    try {
      const response = await api<any>('/api/v1/products/purchase', {
        method: 'POST',
        body: {
          user_id: userId,
          product_id: productId
        },
      })

      if (response.redirect_url) {
        window.location.href = response.redirect_url
      }

      await getProducts()

      return { success: true, data: response }
    } catch (e) {
      console.error(e)
      return { success: false, error: e }
    } finally {
      isLoading.value = false;
    }
  }


  return {
    purchasedProducts,
    purchasedSubscriptions,
    purchaseProduct,
    isLoading,
    getProducts,
  }
}