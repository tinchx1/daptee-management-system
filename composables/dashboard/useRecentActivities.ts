import { useFetch } from '#app';
import { computed } from 'vue';

interface Activity {
  description: string;
  time: string;
}
export function useRecentActivities() {
  const isLoading = ref(false);
  const activities = ref<Array<Activity>>([
    { description: 'Pepe Hamilton fue creado', time: 'Hace 1 hora' },
    { description: 'Pepe Hamilton fue eliminado', time: 'Hace 1 hora' },
    { description: 'Producto Laptop X1 fue creado', time: 'Hace 2 horas' }
  ]);
  return {
    activities,
    isLoading,
  };
}
