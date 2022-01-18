import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { RootStackParamList } from '@navigation/types'
import HomeDrawer from '@modules/UI/components/HomeDrawer'

import Home from '@modules/UI/screens/Home'
import Question from '@modules/UI/screens/QuestionScreen'

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator()

const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
    </Stack.Navigator>
)

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Drawer"
            drawerContent={(props) => (
                <HomeDrawer {...props} />
            )}
        >
            <Drawer.Screen name={'Drawer'} component={HomeStack} />
        </Drawer.Navigator>
    )
}

const MainNavigator = () => (
    <NavigationContainer>
        <DrawerStack />
    </NavigationContainer>
)

export default MainNavigator
