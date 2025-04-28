<template>
  <v-app-bar
    app
    density="comfortable"
    color="white"
    elevation="1"

  >

    <v-container class="d-flex justify-center ">
      <v-text-field
        v-if="showSearch"
        v-model="searchValue"
        @input="$emit('update:searchQuery', searchValue)"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        variant="outlined"
        density="compact"
        hide-details
      />
    </v-container>

    <v-spacer />

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
        <v-list-item title="Mi Cuenta" prepend-icon="mdi-account" />
        <v-list-item title="Salir" prepend-icon="mdi-logout" @click="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCookie } from 'nuxt/app';

const props = defineProps<{
  searchQuery: string;
  rail: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
}>();

const router = useRouter();
const route = useRoute(); 

const searchValue = ref(props.searchQuery);
const userName = ref('');
const showSearch = computed(() => route.path !== '/');

const authCookie = useCookie('is_authenticated');
const userCookie = useCookie('user_data');

const userInitial = computed(() => userName.value.charAt(0) || '?');

onMounted(() => {
  try {
    if (userCookie.value) {
      const userData = JSON.parse(userCookie.value as string);
      userName.value = userData.name || userData.username || 'User';
    }
  } catch (error) {
    console.error('Error parsing user data from cookie:', error);
    userName.value = 'User';
  }
});

const logout = () => {
  authCookie.value = null;
  userCookie.value = null;
  router.replace('/login');
};
</script>
