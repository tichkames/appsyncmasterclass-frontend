import { defineStore } from 'pinia'
import { getMyProfile } from '~/lib/backend'

const initialState = {
  profile: {
    id: '',
    createdAt: '1970-01-01',
    imageUrl: 'default_profile.png',
  },
  tweets: {
    tweets: [],
    nextToken: undefined,
  },
  followers: {
    followers: [],
    nextToken: undefined,
  },
  following: {
    following: [],
    nextToken: undefined,
  },
  search: {
    results: [],
    nextToken: undefined,
  },
  notifications: {
    all: [],
    mentions: [],
    newNotifications: 0,
    subscription: undefined,
    messages: {
      conversations: [],
      nextToken: undefined,
      newMessages: 0,
      conversationsSet: new Set(),
      active: {
        conversation: undefined,
        messages: [],
        nextTokenMessages: undefined,
      },
    },
  },
}

export const useTwitterStore = defineStore({
  id: 'twitter',

  state: () => ({
    initialState,
    profile: {}
  }),

  getters: {
    // loggedIn1: state => state.loggedIn,
    // user1: state => state.user
  },

  // Mutations are functions that effect the STATE
  // Actions are functions that you call to trigger mutations
  actions: {
      async setProfile() {
        const { $api } = useNuxtApp()
        const profile = await getMyProfile($api)
        console.log('profile', profile)
        this.profile = profile
      },
  }
})