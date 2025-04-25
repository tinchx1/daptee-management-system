<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <!-- Left side - Login form -->
          <v-col cols="12" md="6" class="d-flex align-center justify-center pa-8">
            <v-card width="100%" max-width="450" elevation="0">
              <v-card-title class="text-h4 font-weight-bold text-center text-primary mb-6">
                Daptee Management System
              </v-card-title>

              <v-form @submit.prevent="handleLogin">
                <v-alert v-if="error" type="error" variant="tonal" closable class="mb-4">
                  {{ error }}
                </v-alert>

                <v-text-field v-model="username" label="Username" variant="outlined" required
                  :disabled="isLoading"></v-text-field>

                <v-text-field v-model="password" label="Password" variant="outlined" type="password" required
                  :disabled="isLoading"></v-text-field>

                <v-btn type="submit" color="primary" block size="large" :loading="isLoading" class="mt-4">
                  Login
                </v-btn>
              </v-form>
            </v-card>
          </v-col>

          <!-- Right side - Background image -->
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const isAuthenticated = ref(false);

// Check if user is already logged in
onMounted(() => {
  let auth = localStorage.getItem('isAuthenticated');
  if (auth === 'true') {
    isAuthenticated.value = true;
    router.push('/');
  } else {
    isAuthenticated.value = false;
  }
});

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (username.value === 'Daptee' && password.value === 'Daptee2025') {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        username: username.value,
        name: 'Daptee Admin'
      }));

      // Redirect to dashboard
      router.push('/');
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>