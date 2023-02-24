//packages/app/navigation/native/index.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../features/home/screen";
import { UserDetailScreen } from "../../features/user/detail-screen";

const Stack = createNativeStackNavigator<{
  home: undefined;
  "user-detail": {
    id: string;
  };
}>();

type NativeNavigationProps = {
  logout: () => void;
};

export const NativeNavigation = (props: NativeNavigationProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
        }}
      >
        {() => <HomeScreen logout={props.logout} />}
      </Stack.Screen>
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: "User",
        }}
      />
    </Stack.Navigator>
  );
};
