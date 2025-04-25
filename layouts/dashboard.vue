<template>
  <v-app>
    <!-- Check if authenticated -->
    <template v-if="isAuthenticated">
      <!-- Sidebar -->
      <SideMenu :active-module="activeModule" />

      <!-- Main content -->
      <v-main>
        <!-- Header -->
        <AppHeader :search-query="searchQuery" @update:search-query="updateSearchQuery" />

        <!-- Page content -->
        <v-container fluid class="pa-6">
          <slot />
        </v-container>
      </v-main>
    </template>

    <!-- Redirect to login if not authenticated -->
    <v-main v-else class="d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="ml-2">Redirecting to login...</span>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SideMenu from '~/components/SideMenu.vue';
import AppHeader from '~/components/AppHeader.vue';
const isBrowser = typeof window !== 'undefined';

// Safely access localStorage
const isAuthenticatedLocalStorage = isBrowser ? localStorage.getItem('isAuthenticated') : null;
const isAuthenticated = ref(isAuthenticatedLocalStorage === 'true');
const router = useRouter();
const route = useRoute();
const activeModule = ref('');
const searchQuery = ref('');

// Provide search query to child components
provide('searchQuery', searchQuery);

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
};

onMounted(() => {
  // Set active module based on route
  const path = route.path;
  if (path.includes('users')) {
    activeModule.value = 'users';
  } else if (path.includes('products')) {
    activeModule.value = 'products';
  } else {
    activeModule.value = 'dashboard';
  }

  if (!isAuthenticated.value) {
    router.push('/login');
  }
});

// Watch for route changes to update active module
watch(() => route.path, (path) => {
  if (path.includes('users')) {
    activeModule.value = 'users';
  } else if (path.includes('products')) {
    activeModule.value = 'products';
  } else {
    activeModule.value = 'dashboard';
  }
});
</script>