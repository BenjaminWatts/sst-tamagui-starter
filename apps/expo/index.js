// import "expo-router/entry";

// import { registerRootComponent } from 'expo'

// import App from './App'

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App)
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Provider } from "app/provider";
import { useFonts } from "expo-font";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_URL = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;

// Must be exported or Fast Refresh won't update the context
export function App() {
  React.useEffect(() => {
    if (__DEV__) {
      require("./reactotron").initReactotron();
    }
  }, []);

  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
  });

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  const ctx = require.context("./app");

  return (
    <Provider>
      <ApolloProvider client={client}>
        <ExpoRoot context={ctx} />
      </ApolloProvider>
    </Provider>
  );
}

registerRootComponent(App);
