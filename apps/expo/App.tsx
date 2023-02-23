///apps.expo.App.tsx
import 'expo-dev-client'
import React from 'react'
import { NativeNavigation } from 'app/navigation/native'
import {LoginScreen} from 'app/features/login/screen'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const API_URL = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;
console.log(`rendering with ${API_URL}`)

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <Provider>
        {loggedIn ? <NativeNavigation
          logout={() => setLoggedIn(false)}
        /> : <LoginScreen login={() => setLoggedIn(true)} />}
      </Provider>
    </ApolloProvider>
  )
}
