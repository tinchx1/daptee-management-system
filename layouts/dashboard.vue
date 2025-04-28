<template>
  <v-app>
    <!-- Sidebar -->
    <SideMenu :active-module="activeModule" :rail="rail" @toggle-rail="toggleRail" />

    <v-main :class="{ 'with-rail': rail, 'with-sidebar': !rail }" style="padding-top: 64px;">
      <AppHeader :search-query="searchQuery" :rail="rail" @update:search-query="updateSearchQuery" />
      

    <v-container fluid width="1200" class="pt-6">
        <NuxtPage />
      </v-container>

    </v-main>
  </v-app>
</template>


<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import SideMenu from '~/components/SideMenu.vue';
import AppHeader from '~/components/AppHeader.vue';

const route = useRoute();
const activeModule = ref('');
const searchQuery = ref('');
const rail = ref(false); // <-- estado global del rail

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

const toggleRail = () => {
  rail.value = !rail.value;
};

updateActiveModule(route.path);

watch(() => route.path, (path) => {
  updateActiveModule(path);
});
</script>

<style scoped>
/* Reservar espacio para sidebar */
.with-sidebar {
  padding-left: 260px; /* ancho sidebar completo */
}

.with-rail {
  padding-left: 72px; /* ancho sidebar mini */
}
</style>
