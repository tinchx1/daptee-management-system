<template>
  <v-navigation-drawer
    permanent
    :rail="rail"
    width="260"
    rail-width="70"
    color="primary"
    class="side-menu max-height-100vh"
  >
    <div class="d-flex flex-column h-100">
      <div class="pa-4 d-flex justify-center">
        <DapteeLogo v-if="!rail" width="227" height="60" />
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
          class="padding-inline"
        />
        <v-list-item
          to="/users"
          :active="activeModule === 'users'"
          prepend-icon="mdi-account-group"
          title="Usuarios"
          value="users"
          color="white"
          class="padding-inline"
        />
        <v-list-item
          to="/products"
          :active="activeModule === 'products'"
          prepend-icon="mdi-package-variant-closed"
          title="Productos"
          value="products"
          color="white"
          class="padding-inline"
        />
      </v-list>

      <v-spacer />

      <div class="pa-4 text-end text-caption text-white text-opacity-70">
        <v-btn
          icon
          size="small"
          @click="$emit('toggle-rail')"
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
import DapteeLogo from './icons/DapteeLogo.vue';
import DapteeLogoMobile from './icons/DapteeLogoMobile.vue';

const props = defineProps<{
  activeModule: string;
  rail: boolean;
}>();

const emit = defineEmits(['toggle-rail']);
</script>
<style scoped>
.padding-inline {
  padding-inline: 14px;
}
</style>
