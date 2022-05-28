// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
    build: {
        postcss: {
          postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            },
          },
        },
      },
    css: [
      "~/assets/css/tailwind.css"
    ],
    alias: {
      '@aws-amplify/core': '@aws-amplify/core/lib',
      '@aws-amplify/auth': '@aws-amplify/auth/lib',
    },
    modules: [
      '@pinia/nuxt'
    ],
}
