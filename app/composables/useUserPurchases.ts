import type { Product } from "~/types/product";
import type { Subscription } from "~/types/subscription";

export const useUserPurchases = () => {
  const purchasedProducts = useState<Product[]>('purchasedProducts', () => []);
  const purchasedSubscriptions = useState<Subscription[]>('purchasedSubscriptions', () => []);

  const { products, getProducts } = useProducts();
  const { subscriptions, getSubscriptions } = useSubscriptions();

  const api = useApi()
  const isLoading = ref<boolean>(false);

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

      return {success: true, data: response}
    } catch (e) {
      console.error(e)
      return {success: false, error: e}
    } finally {
      isLoading.value = false;
    }
  }

  const purchaseSubscription = async (userId: number, subscriptionId: number) => {
    isLoading.value = true;

    try {
      const response = await api<any>('/api/v1/subscriptions/purchase', {
        method: 'POST',
        body: {
          user_id: userId,
          subscription_id: subscriptionId
        }
      })

      if (response.redirect_url) {
        window.location.href = response.redirect_url
      }

      return {success: true, data: response}
    } catch (e) {
      console.error(e)
      return {success: false, error: e}
    } finally {
      isLoading.value = false;
    }
  }

  purchasedSubscriptions.value = subscriptions.value.filter(s => s.is_purchased)
  purchasedProducts.value = products.value.filter(p => p.is_purchased)

  return {
    purchasedProducts,
    purchasedSubscriptions,
    purchaseProduct,
    purchaseSubscription,
    isLoading,
    getProducts,
    getSubscriptions
  }
}