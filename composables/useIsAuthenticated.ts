export default function () {
    const { $auth } = useNuxtApp();

    const isAuthenticated = useState('authenticated', () => false);

    return {
      isAuthenticated,
      refresh: async () => {
        isAuthenticated.value = !!(await $auth.currentAuthenticatedUser());
      },
    };
}