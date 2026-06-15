// import type { Product } from "~/types/product";
//
// export const useProducts = () => {
//   const api = useApi();
//
//   const products = useState<Product[]>('products', () => []);
//   const { userData } = useTelegram()
//
//   const loading = ref<boolean>(false);
//
//   const getProducts = async() => {
//     if (products.value.length > 0) return
//
//     loading.value = true;
//
//     try {
//       const data = await api<Product[]>(`/api/v1/products?user_id=${userData.value.id}`)
//       if(Array.isArray(data)) {
//         products.value = data
//       }
//     } catch (error) {
//       loading.value = false;
//       console.log(error)
//     } finally {
//       loading.value = false;
//     }
//   }
//
//   return {
//     getProducts,
//     products,
//     loading,
//   }
// }

import type { Product } from "~/types/product";
import { MOCK_PRODUCTS } from "~/mock/data";

export const useProducts = () => {
  const products = useState<Product[]>('products', () => []);
  const loading = ref<boolean>(false);

  const getProducts = async () => {
    if (products.value.length > 0) return;

    loading.value = true;

    try {
      const data = await new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve(MOCK_PRODUCTS);
        }, 800);
      });

      if (Array.isArray(data)) {
        products.value = data;
      }
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
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