<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
            <v-card width="100%" max-width="550" elevation="0">
              <v-card-title class="text-h3 font-weight-bold text-center text-primary mb-6">
                Sistema de Gestión
              </v-card-title>

              <v-form @submit.prevent="submitLogin">
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  closable
                  class="mb-4"
                >
                  {{ error }}
                </v-alert>

                <v-text-field
                  v-model="username"
                  label="Usuario"
                  variant="outlined"
                  required
                  :disabled="isLoading"
                />

                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  required
                  :disabled="isLoading"
                />

                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="isLoading"
                  class="mt-4"
                >
                  Iniciar sesión
                </v-btn>
              </v-form>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" class="d-none d-md-flex bg-primary">
            <div class="d-flex flex-column align-center justify-center w-100 text-white text-center pa-8">
              <h2 class="text-h3 font-weight-bold mb-4">Bienvenido a Daptee</h2>
              <p class="text-h6">Tu solución interna de gestión</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

const { login, isLoading, error } = useAuth();

const username = ref('');
const password = ref('');

const submitLogin = () => {
  login(username.value, password.value);
};
</script>
