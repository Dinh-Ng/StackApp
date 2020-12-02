import { initialWindowMetrics } from 'react-native-safe-area-context'

const metrics = {
    SMALLEST: 4,
    SMALLER: 8,
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 18,
    LARGER: 22,
    LARGEST: 28,
    safeTopPadding: initialWindowMetrics?.insets.top || 0,
    safeBottomPadding: initialWindowMetrics?.insets.bottom || 0,
}

export type Metrics = typeof metrics

export default metrics
