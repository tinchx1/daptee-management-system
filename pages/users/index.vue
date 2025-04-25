<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Users</h1>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <!-- Error message -->
    <v-alert v-else-if="error" type="error" variant="tonal" closable>
      {{ error }}
    </v-alert>

    <!-- Users table -->
    <v-card v-else>
      <div v-if="filteredUsers.length === 0" class="pa-6 text-center text-grey">
        No users found matching your search criteria.
      </div>

      <v-data-table v-else :headers="headers" :items="filteredUsers" :items-per-page="10" class="elevation-0">
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center">
            <v-avatar color="primary" class="mr-3">
              <span class="text-white">{{ item.name.charAt(0) }}</span>
            </v-avatar>
            <div>
              <div>{{ item.name }}</div>
              <div class="text-caption text-grey">@{{ item.username }}</div>
            </div>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn icon variant="text" v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="viewUser(item)">
                <template v-slot:prepend>
                  <v-icon>mdi-eye</v-icon>
                </template>
                <v-list-item-title>View Details</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteUser(item.id)">
                <template v-slot:prepend>
                  <v-icon color="error">mdi-delete</v-icon>
                </template>
                <v-list-item-title class="text-error">Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- User details dialog -->
    <v-dialog v-model="showUserModal" max-width="600px">
      <v-card v-if="selectedUser">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>User Details</span>
          <v-btn icon variant="text" @click="showUserModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div class="d-flex align-center mb-4">
            <v-avatar color="primary" size="64" class="mr-4">
              <span class="text-h4 text-white">{{ selectedUser.name.charAt(0) }}</span>
            </v-avatar>
            <div>
              <div class="text-h5">{{ selectedUser.name }}</div>
              <div class="text-subtitle-1 text-grey">@{{ selectedUser.username }}</div>
            </div>
          </div>

          <v-divider class="mb-4"></v-divider>

          <v-row>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Email</div>
              <div>{{ selectedUser.email }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Phone</div>
              <div>{{ selectedUser.phone }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Website</div>
              <div>{{ selectedUser.website }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Company</div>
              <div>{{ selectedUser.company.name }}</div>
            </v-col>
            <v-col cols="12">
              <div class="text-caption text-grey">Address</div>
              <div>
                {{ selectedUser.address.street }}, {{ selectedUser.address.suite }}<br>
                {{ selectedUser.address.city }}, {{ selectedUser.address.zipcode }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, watch, Ref } from 'vue';
import { definePageMeta } from '#imports';

definePageMeta({
  layout: 'dashboard'
});

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
}

const users = ref<User[]>([]);
const isLoading = ref(true);
const error = ref('');
const showUserModal = ref(false);
const selectedUser = ref<User | null>(null);

// Table headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Company', key: 'company.name' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' }
];

// Get search query from parent component
const searchQuery = inject<Ref<string>>('searchQuery', ref(''));

// Filtered users based on search query
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value;
  }

  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query)
  );
});

// Fetch users from API
const fetchUsers = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    users.value = data;
  } catch (err) {
    console.error('Error fetching users:', err);
    error.value = 'Failed to load users. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// View user details
const viewUser = (user: User) => {
  selectedUser.value = user;
  showUserModal.value = true;
};

// Delete user
const deleteUser = (userId: number) => {
  users.value = users.value.filter(user => user.id !== userId);
};

onMounted(() => {
  fetchUsers();
});
</script>