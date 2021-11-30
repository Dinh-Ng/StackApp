import React from 'react'
import { Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Home from '@modules/UI/screens/Home'

import { RootStackParamList } from '@navigation/types'
import HomeDrawer from '@modules/UI/components/HomeDrawer'

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem label="Help" onPress={() => Alert.alert('Link to help')} />
        </DrawerContentScrollView>
    )
}

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => (
                // <CustomDrawerContent {...props} />
                <HomeDrawer {...props} />
            )}
        >
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    )
}

const MainNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={DrawerStack} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default MainNavigator
