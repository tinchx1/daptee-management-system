<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Dashboard</h1>
    
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal" rounded>
                <v-icon icon="mdi-account-group" color="primary"></v-icon>
              </v-avatar>
            </template>
            <v-card-title>Users</v-card-title>
          </v-card-item>
          
          <v-card-text>
            <div class="text-h3 font-weight-bold mb-2">{{ userCount }}</div>
            <v-btn
              variant="text"
              color="primary"
              to="/users"
              class="px-0"
            >
              View all users
              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal" rounded>
                <v-icon icon="mdi-package-variant-closed" color="primary"></v-icon>
              </v-avatar>
            </template>
            <v-card-title>Products</v-card-title>
          </v-card-item>
          
          <v-card-text>
            <div class="text-h3 font-weight-bold mb-2">{{ productCount }}</div>
            <v-btn
              variant="text"
              color="primary"
              to="/products"
              class="px-0"
            >
              View all products
              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" variant="tonal" rounded>
                <v-icon icon="mdi-clock-outline" color="primary"></v-icon>
              </v-avatar>
            </template>
            <v-card-title>Recent Activity</v-card-title>
          </v-card-item>
          
          <v-card-text>
            <v-list v-if="!isLoading && activities.length > 0">
              <v-list-item
                v-for="(activity, index) in activities"
                :key="index"
                :title="activity.description"
                :subtitle="activity.time"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-3" size="36">
                    <v-icon icon="mdi-plus" size="small" color="grey"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
            
            <div v-else-if="isLoading" class="d-flex justify-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            
            <div v-else class="text-center py-4 text-grey">
              No recent activities
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const userCount = ref(0);
const productCount = ref(0);
const isLoading = ref(true);
const activities = ref([
  { description: 'User John Doe was added', time: '2 hours ago' },
  { description: 'Product Laptop X1 was updated', time: '5 hours ago' },
  { description: 'User Jane Smith was deleted', time: '1 day ago' }
]);

onMounted(async () => {
  try {
    isLoading.value = true;
    
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    userCount.value = users.length;
    
    const productsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const products = await productsResponse.json();
    productCount.value = products.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>