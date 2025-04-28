import { ref, computed } from 'vue';
import { useFetch } from '#imports';
import type { User } from '~/types/user';

export const useUsers = () => {
  const { data, pending, error: fetchError } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  const users = ref<User[]>([]);

  if (data.value) {
    users.value = data.value;
  }

  const isLoading = computed(() => pending.value);
  const error = computed(() => fetchError.value?.message || '');

  const deleteUser = (userId: number) => {
    users.value = users.value.filter(user => user.id !== userId);
  };

  return {
    users,
    isLoading,
    error,
    deleteUser
  };
};
