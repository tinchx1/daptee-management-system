<template>
  <div class="error-404">
    <h1 class="text-h1 text-primary mb-4">404</h1>
    <h2 class="text-h5 mb-6">Página no encontrada</h2>
    <v-btn color="primary" @click="goHome">
      Volver al inicio
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.error-404 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
