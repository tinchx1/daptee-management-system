<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">Usuarios</h1>
    
    <div v-if="isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
    
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      closable
    >
      {{ error }}
    </v-alert>
    
    <v-card v-else>
      <div v-if="filteredUsers.length === 0" class="pa-6 text-center text-grey">
        No se encontraron usuarios que coincidan con su criterio de búsqueda.
      </div>
      
      <v-data-table
        v-else
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="10"
        class="elevation-0"
      >
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
              <v-btn
                icon
                variant="text"
                v-bind="props"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="viewUser(item)">
                <template v-slot:prepend>
                  <v-icon>mdi-eye</v-icon>
                </template>
                <v-list-item-title>Ver Detalles</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteUser(item.id)">
                <template v-slot:prepend>
                  <v-icon color="error">mdi-delete</v-icon>
                </template>
                <v-list-item-title class="text-error">Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    
    <v-dialog v-model="showUserModal" max-width="600px">
      <v-card v-if="selectedUser">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Detalles del Usuario</span>
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
              <div class="text-caption text-grey">Número de Teléfono</div>
              <div>{{ selectedUser.phone }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Sitio Web</div>
              <div>{{ selectedUser.website }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-grey">Compañía</div>
              <div>{{ selectedUser.company.name }}</div>
            </v-col>
            <v-col cols="12">
              <div class="text-caption text-grey">Dirección </div>
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
import { definePageMeta } from '#imports';
import { useUsers } from '~/composables/users/useUser';
import { useFilteredUsers } from '~/composables/users/useFilteredUser';
import { useSelectedUser } from '~/composables/users/useSelectedUser';

interface Header {
  title: string;
  key: string;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

const { users, isLoading, error, deleteUser } = useUsers();
const { filteredUsers } = useFilteredUsers(users);
const { showUserModal, selectedUser, viewUser, closeModal } = useSelectedUser();

const headers: Array<Header> = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Nombre', key: 'name' },
  { title: 'Correo Electrónico', key: 'email' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Compañía', key: 'company.name' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'end' }
];

</script>
