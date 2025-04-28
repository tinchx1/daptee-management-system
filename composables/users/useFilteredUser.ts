import { computed, inject, ref } from 'vue';
import type { User } from '~/types/user';

export const useFilteredUsers = (users: Ref<User[]>) => {
  const searchQuery = inject('searchQuery', ref(''));

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;

    const query = searchQuery.value.toLowerCase();
    return users.value.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    );
  });

  return {
    searchQuery,
    filteredUsers
  };
};
