import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    loggedIn: false,
    user: undefined,
  }),

  getters: {
    // loggedIn1: state => state.loggedIn,
    // user1: state => state.user
  },

  // Mutations are functions that effect the STATE
  // Actions are functions that you call to trigger mutations
  actions: {
      loginUser(user) {
        this.user = user
        this.loggedIn = true
      },
      async logoutUser() {
        const { $auth } = useNuxtApp();
        await $auth.signOut({
          global: true
        })
        this.loggedIn = false;
        this.user = undefined;
        const router = useRouter()
        router.push('/')
      },
      async signupUser(form : any) {
        const { $auth } = useNuxtApp();
        const user = await $auth.signUp({
            username: form.username,
            password: form.password,
            attributes: {
              name: form.name,
            }
        });
        this.user = user;
      },
      async confirmSignUp(form : any) {
        const { $auth } = useNuxtApp();
        await $auth.confirmSignUp(form.email, form.verificationCode)
      },
      async resendSignUp(form) {
        const { $auth } = useNuxtApp();
        await $auth.resendSignUp(form.email);
      },
      async signInUser(form) {
        const { $auth } = useNuxtApp();
        const user = await $auth.signIn(form.email, form.password);
        await this.loginUser(user);
        // await dispatch("twitter/setProfile", null, { root: true });
        // await dispatch("twitter/subscribeNotifications", null, { root: true });
        const router = useRouter()
        router.push('/home')
      },
      async loginUserIfAlreadyAuthenticated() {
        const { $auth } = useNuxtApp();
        const user = await $auth.currentUserInfo();
        if (user) {
          console.log('user is logged in already')
          await this.loginUser(user);
        //   await dispatch("twitter/setProfile", null, { root: true });
        //   await dispatch("twitter/subscribeNotifications", null, { root: true });
        }
      },
  }
})