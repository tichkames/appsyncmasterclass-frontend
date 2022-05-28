<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id">
      <Tweet v-if="!tweet.retweetOf" :tweet="tweet" />
      <Retweet v-if="tweet.retweetOf" :tweet="tweet" />
    </div>
  </div>
</template>

<script>
    export default {
        props: ['tweets'],
    }
</script>