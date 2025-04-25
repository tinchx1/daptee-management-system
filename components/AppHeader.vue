<template>
  <v-app-bar color="white" elevation="1">
    <template v-slot:prepend>
      <v-text-field v-model="searchValue" @input="$emit('update:searchQuery', searchValue)"
        prepend-inner-icon="mdi-magnify" placeholder="Search..." variant="outlined" density="compact" hide-details
        class="max-width-300"></v-text-field>
    </template>

    <v-spacer></v-spacer>

    <v-menu location="bottom end">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text">
          <v-avatar color="primary" size="32" class="mr-2">
            <span class="text-white">{{ userInitial }}</span>
          </v-avatar>
          <span class="d-none d-sm-flex">{{ userName }}</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="My Account" prepend-icon="mdi-account"></v-list-item>
        <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logout"></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
}>();

const router = useRouter();
const searchValue = ref(props.searchQuery);
const userName = ref('');
const userInitial = computed(() => userName.value.charAt(0));

// Get user data from localStorage
const userData = ref(localStorage.getItem('user'));
const user = computed(() => userData.value ? JSON.parse(userData.value) : null);

onMounted(() => {
  if (user.value) {
    userName.value = user.value.name || user.value.username;
  }
});

const logout = () => {
  // Clear authentication data
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
  userData.value = null;

  // Redirect to login page
  router.push('/login');
};
</script>

<style scoped>
.max-width-300 {
  max-width: 300px;
}
</style>