import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from 'nuxt/app';

export function useAuth() {
  const router = useRouter();
  const isLoading = ref(false);
  const error = ref('');

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

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = '';

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === 'Daptee' && password === 'Daptee2025') {
        authCookie.value = 'true';
        userCookie.value = JSON.stringify({
          username,
          name: 'Administrador Daptee'
        });

        console.log('Datos de usuario guardados en cookie:', userCookie.value);
        await router.replace('/');
      } else {
        error.value = 'Usuario o contraseña inválidos';
        console.error('Credenciales inválidas:', username, password);
      }
    } catch (err) {
      error.value = 'Ocurrió un error. Por favor, intenta de nuevo.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    login,
    isLoading,
    error
  };
}
