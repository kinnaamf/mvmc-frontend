import type { Item } from "~/types/item";
import type { Subscription } from "~/types/subscription";

export const useUserPurchases = () => {
  const purchasedItems = useState<Item[]>('purchasedItems', () => []);
  const purchasedSubscriptions = useState<Subscription[]>('purchasedSubscriptions', () => []);

  return {
    purchasedItems,
    purchasedSubscriptions,
  }
}