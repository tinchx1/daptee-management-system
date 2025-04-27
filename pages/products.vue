<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Products</h1>
    
    <div v-if="isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
    
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      closable
    >
      {{ error }}
    </v-alert>
    
    <div v-else>
      <div v-if="filteredProducts.length === 0" class="pa-6 text-center text-grey">
        <v-card>
          <v-card-text>No products found matching your search criteria.</v-card-text>
        </v-card>
      </div>
      
      <v-row v-else>
        <v-col
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card height="100%">
            <v-card-item>
              <template v-slot:prepend>
                <v-chip color="primary" variant="tonal" size="small">ID: {{ product.id }}</v-chip>
              </template>
              <template v-slot:append>
                <v-menu location="bottom end">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon
                      variant="text"
                      v-bind="props"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="viewProduct(product)">
                      <template v-slot:prepend>
                        <v-icon>mdi-eye</v-icon>
                      </template>
                      <v-list-item-title>View Details</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteProduct(product.id)">
                      <template v-slot:prepend>
                        <v-icon color="error">mdi-delete</v-icon>
                      </template>
                      <v-list-item-title class="text-error">Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <v-card-title class="text-truncate">{{ product.title }}</v-card-title>
            </v-card-item>
            
            <v-card-text>
              <div class="text-body-2 text-truncate-3-lines mb-2">{{ product.body }}</div>
              <div class="text-caption text-grey">User ID: {{ product.userId }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    
    <v-dialog v-model="showProductModal" max-width="600px">
      <v-card v-if="selectedProduct">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Product Details</span>
          <v-btn icon variant="text" @click="showProductModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text>
          <h3 class="text-h5 mb-2">{{ selectedProduct.title }}</h3>
          
          <div class="d-flex mb-4">
            <v-chip color="primary" variant="tonal" class="mr-2">ID: {{ selectedProduct.id }}</v-chip>
            <v-chip color="grey" variant="tonal">User ID: {{ selectedProduct.userId }}</v-chip>
          </div>
          
          <v-divider class="mb-4"></v-divider>
          
          <p class="text-body-1">{{ selectedProduct.body }}</p>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="showProductModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, type Ref } from 'vue';
import { definePageMeta } from '#imports';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

interface Product {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const products = ref<Product[]>([]);
const isLoading = ref(true);
const error = ref('');
const showProductModal = ref(false);
const selectedProduct = ref<Product | null>(null);

const searchQuery = inject<Ref<string>>('searchQuery', ref(''));

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(product => 
    product.title.toLowerCase().includes(query) ||
    product.body.toLowerCase().includes(query)
  );
});

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    products.value = data.slice(0, 30); 
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = 'Failed to load products. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const viewProduct = (product: Product) => {
  selectedProduct.value = product;
  showProductModal.value = true;
};

const deleteProduct = (productId: number) => {
  products.value = products.value.filter(product => product.id !== productId);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.text-truncate-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>