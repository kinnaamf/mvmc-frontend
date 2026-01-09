export const useUserPurchases = () => {
  const purchasedItems = useState<Item[]>('purchasedItems', () => []);
  const purchasedSubscriptions = useState<Item[]>('purchasedItems', () => []);

  return {
    purchasedItems,
    purchasedSubscriptions,
  }
}