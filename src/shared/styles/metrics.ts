import { Dimensions, Platform } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const { width, height } = Dimensions.get('window')
const isAndroid = Platform.OS === 'android'

const safeTopPaddingPlatform = isAndroid ? verticalScale(15) : StaticSafeAreaInsets.safeAreaInsetsTop
const safeTopPadding = safeTopPaddingPlatform === 0 ? verticalScale(30) : safeTopPaddingPlatform
const safeBottomPadding =
    Platform.OS === 'android'
        ? 0
        : StaticSafeAreaInsets.safeAreaInsetsBottom === 0
        ? 20
        : StaticSafeAreaInsets.safeAreaInsetsBottom;

const metrics = {
    SMALLEST: 4,
    SMALLER: 8,
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 18,
    LARGER: 22,
    LARGEST: 28,
    safeTopPadding,
    safeBottomPadding,
    screenHeight: width < height ? height : width,
    screenWidth: height < width ? height : width,
}

export type Metrics = typeof metrics

export default metrics
