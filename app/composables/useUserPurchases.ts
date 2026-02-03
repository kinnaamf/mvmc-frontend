import type { Product } from "~/types/product";
import type { Subscription } from "~/types/subscription";

export const useUserPurchases = () => {
  const purchasedProducts = useState<Product[]>('purchasedProducts', () => []);
  const purchasedSubscriptions = useState<Subscription[]>('purchasedSubscriptions', () => []);

  const api = useApi()

  const purchaseProduct = async (userId, productId) => {
    try {
      const response = await api('/api/v1/products/purchase', {
        method: 'POST',
        body: {
          user_id: userId,
          product_id: productId
        },
      })

      if (response.redirect_url) {
        window.location.href = response.redirect_url
      }

      return { success: true, data: response }
    } catch (e) {
      console.error(e)
      return { success: false, error: e }
    }
  }

  return {
    purchasedProducts,
    purchasedSubscriptions,
    purchaseProduct,
  }
}