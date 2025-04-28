<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Productos</h1>

    <div v-if="isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <v-alert v-else-if="fetchError" type="error" variant="tonal" closable>
      Error cargando productos: {{ fetchError }}
    </v-alert>

    <div v-else>
      <div v-if="filteredProducts.length === 0" class="pa-6 text-center text-grey">
        <v-card>
          <v-card-text>No se encontraron productos con el criterio de búsqueda.</v-card-text>
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
              <template #prepend>
                <v-chip color="primary" variant="tonal" size="small">ID: {{ product.id }}</v-chip>
              </template>

              <template #append>
                <v-menu location="bottom end">
                  <template #activator="{ props }">
                    <v-btn icon variant="text" v-bind="props">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="viewProduct(product)">
                      <template #prepend>
                        <v-icon>mdi-eye</v-icon>
                      </template>
                      <v-list-item-title>Ver Detalles</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteProduct(product.id)">
                      <template #prepend>
                        <v-icon color="error">mdi-delete</v-icon>
                      </template>
                      <v-list-item-title class="text-error">Eliminar</v-list-item-title>
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
      <template v-if="selectedProduct">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Detalles del Producto</span>
            <v-btn icon variant="text" @click="closeProductModal">
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
            <v-spacer />
            <v-btn color="primary" variant="text" @click="closeProductModal">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import { useProducts } from '~/composables/useProducts';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const {
  filteredProducts,
  isLoading,
  fetchError,
  viewProduct,
  deleteProduct,
  showProductModal,
  selectedProduct,
  closeProductModal
} = useProducts();
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
