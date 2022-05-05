export default defineNuxtRouteMiddleware(async (to) => {
    const isProtected = to.matched.some(route => route.meta.protected);
    const isAuthenticated = useIsAuthenticated()
    console.log('isProtected:', isProtected)
    console.log('isAuthenticated:', isAuthenticated.isAuthenticated.value)
    if (isProtected && !isAuthenticated.isAuthenticated.value) {
      return '/';
    }
})