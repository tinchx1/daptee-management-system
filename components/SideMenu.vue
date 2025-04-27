<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    color="primary"
    class="side-menu max-height-100vh"
  >
    <div class="d-flex flex-column h-100">
      <div class="pa-4 d-flex justify-center">
        <DapteeLogo v-if="!rail" width="220" height="60" />
        <DapteeLogoMobile v-else />
      </div>

      <v-list nav class="mt-4">
        <v-list-item
          to="/"
          :active="activeModule === 'dashboard'"
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          color="white"
        />
        <v-list-item
          to="/users"
          :active="activeModule === 'users'"
          prepend-icon="mdi-account-group"
          title="Users"
          value="users"
          color="white"
        />
        <v-list-item
          to="/products"
          :active="activeModule === 'products'"
          prepend-icon="mdi-package-variant-closed"
          title="Products"
          value="products"
          color="white"
        />
      </v-list>

      <v-spacer />

      <div class="pa-4 text-end text-caption text-white text-opacity-70 ">
        <v-btn
          icon
          size="small"
          @click="toggleRail"
          color="white"
          variant="text"
        >
          <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import DapteeLogo from './icons/DapteeLogo.vue';
import DapteeLogoMobile from './icons/DapteeLogoMobile.vue';

const props = defineProps<{
  activeModule: string;
}>();

const { mobile } = useDisplay();
console.log('mobile', mobile.value);
const rail = ref(mobile.value || false);

const toggleRail = () => {
  rail.value = !rail.value;
};
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
