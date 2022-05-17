import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware(async (to) => {
    const isProtected = to.matched.some(route => route.meta.protected);
    const authStore = useAuthStore()
    console.log('isProtected:', isProtected)
    console.log('loggedIn:', authStore.$state.loggedIn)
    if (isProtected && !authStore.$state.loggedIn) {
      return '/';
    }
})