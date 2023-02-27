import { Stack } from 'expo-router';


// export const unstable_settings = {
//     // Ensure any route can link back to `/`
//     initialRouteName: "home",
// }


export default function Layout() {
    // console.log('Layout')
    return (
        <Stack 
            // initialRouteName="home"
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                fontWeight: "bold",
                },
            }}
        />
    )
}