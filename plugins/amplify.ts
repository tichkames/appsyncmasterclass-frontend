import { defineNuxtPlugin } from '#app';

import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

export default defineNuxtPlugin(nuxtApp => {
    Amplify.configure({
        Auth: {
            region: 'us-east-1',
            userPoolId: 'us-east-1_Ns1remR1t',
            userPoolWebClientId: '25251orf354m7gtjq7cprutfvl',
            mandatorySignIn: true
        }
    })

    const myAppConfig = {
        'aws_appsync_graphqlEndpoint': 'https://jvp2vs4yfnaxzdwjgmvsbreplm.appsync-api.us-east-1.amazonaws.com/graphql',
        'aws_appsync_region': 'us-east-1',
        'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
    }
    Amplify.configure(myAppConfig)
    console.log('Configured Amplify plugin successfully.')
    return {
      provide: {
        auth: Auth
      }
    }
})