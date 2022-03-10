import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import Login from "../screens/Login"
import Detail from "../screens/Detail"
import Search from "../screens/Search"




const Stack = createStackNavigator();

function AppRoutes() {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} >
            <Stack.Screen name={"Login"} component={Login} options={{ headerShown: false }}  />

            <Stack.Screen name={"Search"} component={Search} options={{ headerShown: false }}/>
            <Stack.Screen name={"Detail"} component={Detail} options={{ headerShown: false }}/>

        </Stack.Navigator>
        // </NavigationContainer>
    );
}



export default AppRoutes;
