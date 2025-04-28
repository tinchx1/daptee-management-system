import { ref } from 'vue';
import type { User } from '~/types/user';

export const useSelectedUser = () => {
  const showUserModal = ref(false);
  const selectedUser = ref<User | null>(null);

  const viewUser = (user: User) => {
    selectedUser.value = user;
    showUserModal.value = true;
  };

  const closeModal = () => {
    showUserModal.value = false;
    selectedUser.value = null;
  };

  return {
    showUserModal,
    selectedUser,
    viewUser,
    closeModal
  };
};
