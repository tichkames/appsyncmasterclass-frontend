<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side navigation -->
    <SideNav />

    <!-- tweets -->
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
      <div class="px-2 py-3 border-b-8 border-lighter flex">
        <div class="flex-none mr-4">
        <img :src="`${twitterStore.profile.imageUrl || 'default_profile.png'}`" class="flex-none w-12 h-12 rounded-full"/>
        </div>
        <div class="w-full relative">
          <textarea ref="input" v-model="tweet.text" placeholder="What's happening?" class="w-full focus:outline-none mt-3 pb-0 md:pb-3"></textarea>
          <div class="hidden md:block">
            <i class="text-lg text-blue mr-4 far fa-image"></i>
            <i class="text-lg text-blue mr-4 fas fa-film"></i>
            <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue mr-4 far fa-smile"></i>
          </div>
          <div class="flex justify-end md:inline">
            <button @click="addNewTweet" type="button" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full bottom-0 right-0 md:absolute " :class="`${this.tweet.text ? '' : ' opacity-50 cursor-not-allowed'}`">Tweet</button>
          </div>
        </div>
      </div>

      <!-- timeline -->
      <Loader :loading="loading" />
      <div v-if="!loading && tweets.length === 0" class="flex flex-col items-center justify-center w-full pt-10 px-6">
        <p class="font-bold text-lg">Welcome to Twitter!</p>
        <p class="text-sm text-dark text-center">This is the best place to see what’s happening in your world. Find some people and topics to follow now.</p>
        <button class="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
          <p class="hidden lg:block">Let's go!</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>

      <!-- <Tweets :tweets="tweets" /> -->

    </div>

    <!-- default right bar -->
    <DefaultRightBar />
  </div>
</template>

<script setup>
  import { useTwitterStore } from '~/store/twitter'
  import { useAuthStore } from '~/store/auth'

  definePageMeta({
      middleware: 'auth',
      protected: true,
  })

  const twitterStore = useTwitterStore()

  const tweet = reactive({text: ''})
  const loading = ref(true)
  const tweets = reactive([])

  async function addNewTweet() {
    if (!tweet.text) return;
    await this.createTweet({
      text: tweet.text
    });
    tweet.text = ''
  }

  // async function loadMore() {
  //   console.log('loading...');
  //   await this.loadMoreMyTimeline(10).catch(error => {
  //     console.log(error);
  //   })
  // }

  onMounted(async () => {
    console.log('home::onMounted')
    const authStore = useAuthStore()
    if (tweets.length > 0) loading = false
    await authStore.loginUserIfAlreadyAuthenticated()
    // await this.loadMyTimeline().then(() => this.loading = false);
    // this.$nextTick(() => {
    //   this.$refs.input?.focus();
    // });
  })
</script>