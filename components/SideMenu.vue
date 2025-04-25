<template>
  <v-navigation-drawer permanent :rail="rail" @mouseenter="rail = false" @mouseleave="rail = true" color="primary"
    class="side-menu">
    <div class="d-flex flex-column h-100">
      <!-- Logo -->
      <div class="pa-4 d-flex justify-center">
        <DapteeLogo :width="rail ? 40 : 120" :height="rail ? 40 : 40" />
      </div>

      <!-- Menu items -->
      <v-list nav class="mt-4">
        <v-list-item to="/" :active="activeModule === 'dashboard'" prepend-icon="mdi-view-dashboard" title="Dashboard"
          value="dashboard" color="white" />

        <v-list-item to="/users" :active="activeModule === 'users'" prepend-icon="mdi-account-group" title="Users"
          value="users" color="white" />

        <v-list-item to="/products" :active="activeModule === 'products'" prepend-icon="mdi-package-variant-closed"
          title="Products" value="products" color="white" />
      </v-list>

      <!-- Footer -->
      <v-spacer />
      <div class="pa-4 text-center text-caption text-white text-opacity-70">
        <p>© 2025 Daptee</p>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DapteeLogo from './DapteeLogo.vue';

defineProps<{
  activeModule: string;
}>();

const rail = ref(true);
</script>

<style scoped>
.side-menu :deep(.v-list-item__prepend) {
  opacity: 1 !important;
}

.side-menu :deep(.v-list-item--active) {
  background-color: rgba(255, 255, 255, 0.2);
}

.side-menu :deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1);
}

.side-menu :deep(.v-list-item__content) {
  color: white;
}
</style>