import React from 'react'
import { StyleSheet, View } from 'react-native'

import Text from '@core/Text'
import HomeHeader from '@modules/UI/components/HomeHeader'

interface QuestionProps {
    navigation: any
}

const Question: React.FC<QuestionProps> = ({ navigation }: QuestionProps) => {
    console.log(`navigation`, navigation)

    return (
        <View style={styles.container}>
            <HomeHeader />
            <Text>question</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})

export default Question
