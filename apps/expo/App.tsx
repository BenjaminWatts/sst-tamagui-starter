// ///apps.expo.App.tsx
// import 'expo-dev-client'
// import React from 'react'
// import { NativeNavigation } from 'app/navigation/native'
// import {Login} from 'app/features/auth/screens'
// import { Provider } from 'app/provider'
// import { useFonts } from 'expo-font'
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { AuthContext, getCognitoProvider } from './auth'

// const API_URL = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;
// console.log(`rendering with ${API_URL}`)

// const client = new ApolloClient({
//   uri: API_URL,
//   cache: new InMemoryCache(),
// });

// export default function App() {
//   const [loggedIn, setLoggedIn] = React.useState(false)

//   const [loaded] = useFonts({
//     Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
//     InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
//   })

//   if (!loaded) {
//     return null
//   }

//   return (
//     <AuthContext.Provider value={loggedIn}>

//       <ApolloProvider client={client}>
//         <Provider>
//           {/* {loggedIn ? <NativeNavigation
//             logout={() => setLoggedIn(false)}
//           /> : <Login 
//                 provider={getCognitoProvider()}
//                 onToken={(res) => {
//                   console.log(res.IdToken)
//                   // setLoggedIn(true)
//                 }} />} */}

//         </Provider>
//       </ApolloProvider>
//     </AuthContext.Provider>
//   )
// }
