<template>
  <v-app>
    <!-- Sidebar -->
    <SideMenu :active-module="activeModule" />
    
    <!-- Main content -->
    <v-main>
      <!-- Header -->
      <AppHeader :search-query="searchQuery" @update:search-query="updateSearchQuery" />
      
      <!-- Page content -->
      <v-container fluid width="1200" class="pa-6">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeModule = ref('');
const searchQuery = ref('');
provide('searchQuery', searchQuery);

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
};

const updateActiveModule = (path: string) => {
  if (path.includes('users')) {
    activeModule.value = 'users';
  } else if (path.includes('products')) {
    activeModule.value = 'products';
  } else {
    activeModule.value = 'dashboard';
  }
};

updateActiveModule(route.path);

watch(() => route.path, (path) => {
  updateActiveModule(path);
});
</script>