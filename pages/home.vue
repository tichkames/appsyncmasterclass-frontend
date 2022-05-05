<template>
  <div>
    <p>Home</p>
  </div>
</template>

<script setup>
    definePageMeta({
        middleware: 'auth',
        protected: true,
    })
</script>