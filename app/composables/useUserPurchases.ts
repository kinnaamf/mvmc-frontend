import type { Product } from "~/types/product";
import type { Subscription } from "~/types/subscription";

export const useUserPurchases = () => {
  const purchasedProducts = useState<Product[]>('purchasedProducts', () => []);
  const purchasedSubscriptions = useState<Subscription[]>('purchasedSubscriptions', () => []);

  return {
    purchasedProducts,
    purchasedSubscriptions,
  }
}