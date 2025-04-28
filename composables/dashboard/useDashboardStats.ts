import { computed } from 'vue';
import { useFetch } from '#app';
import type { User } from '~/types/user';
import type { Product } from '~/types/products';

export function useDashboardStats() {
  const { data: usersData, pending: loadingUsers, error: errorUsers } = useFetch<Array<User>>('https://jsonplaceholder.typicode.com/users');
  const { data: productsData, pending: loadingProducts, error: errorProducts } = useFetch<Array<Product>>('https://jsonplaceholder.typicode.com/posts');

  const userCount = computed(() => usersData.value?.length || 0);
  const productCount = computed(() => productsData.value?.length || 0);
  const isLoadingStats = computed(() => loadingUsers.value || loadingProducts.value);
  const hasError = computed(() => errorUsers.value || errorProducts.value);

  return {
    userCount,
    productCount,
    isLoadingStats,
    hasError
  };
}
