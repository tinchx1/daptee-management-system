<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
            <v-card width="100%" max-width="450" elevation="0">
              <v-card-title class="text-h4 font-weight-bold text-center text-primary mb-6">
                Daptee Management System
              </v-card-title>
              
              <v-form @submit.prevent="handleLogin">
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
                  label="Username"
                  variant="outlined"
                  required
                  :disabled="isLoading"
                ></v-text-field>
                
                <v-text-field
                  v-model="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  :disabled="isLoading"
                ></v-text-field>
                
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="isLoading"
                  class="mt-4"
                >
                  Login
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6" class="d-none d-md-flex bg-primary">
            <div class="d-flex flex-column align-center justify-center w-100 text-white text-center pa-8">
              <h2 class="text-h3 font-weight-bold mb-4">Welcome to Daptee</h2>
              <p class="text-h6">Your internal management solution</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from 'nuxt/app';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const authCookie = useCookie('is_authenticated', {
  maxAge: 60 * 60 * 24 * 7, 
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});

const userCookie = useCookie('user_data', {
  maxAge: 60 * 60 * 24 * 7, 
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username.value === 'Daptee' && password.value === 'Daptee2025') {
      authCookie.value = 'true';
      
      userCookie.value = JSON.stringify({ 
        username: username.value,
        name: 'Daptee Admin'
      });
      console.log('User data stored in cookie:', userCookie.value);
      router.replace('/');
    } else {
      error.value = 'Invalid username or password';
      console.error('Invalid credentials:', username.value, password.value);
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>