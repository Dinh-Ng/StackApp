import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import tron, { ReactotronReactNative } from 'reactotron-react-native'

import App from './App'
import { Reactotron } from 'reactotron-core-client'

declare global {
    interface Console {
        tron: Reactotron<ReactotronReactNative> & ReactotronReactNative
    }
}

if (__DEV__) {
    console.tron = tron
}

AppRegistry.registerComponent('SoF', () => App)
