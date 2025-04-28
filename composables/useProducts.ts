// composables/useProducts.ts
import { ref, computed, inject } from 'vue';
import { useFetch } from '#app';
import type { Product } from '~/types/products';

export function useProducts() {
  const { data, pending, error } = useFetch<Product[]>('https://jsonplaceholder.typicode.com/posts');

  const products = computed(() => (data.value || []).slice(0, 30));
  const isLoading = computed(() => pending.value);
  const fetchError = computed(() => error.value?.message || '');

  const searchQuery = inject('searchQuery', ref(''));

  const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;

    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.body.toLowerCase().includes(query)
    );
  });

  const showProductModal = ref(false);
  const selectedProduct = ref<Product | null>(null);

  const viewProduct = (product: Product) => {
    selectedProduct.value = product;
    showProductModal.value = true;
  };

  const closeProductModal = () => {
    showProductModal.value = false;
    selectedProduct.value = null;
  };

  const deleteProduct = (productId: number) => {
    if (!data.value) return;
    data.value = data.value.filter(product => product.id !== productId);
  };

  return {
    products,
    filteredProducts,
    isLoading,
    fetchError,
    viewProduct,
    deleteProduct,
    showProductModal,
    selectedProduct,
    closeProductModal
  };
}
