import { defineNuxtRouteMiddleware, useCookie, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Middleware de autenticación ejecutándose...')
  const isAuthenticated = useCookie('is_authenticated').value?.toString() === 'true';
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login', { replace: true });
  }

  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/', { replace: true });
  }
});