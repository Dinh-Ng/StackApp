import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import WebView from 'react-native-webview'
import { useRequest } from 'ahooks'

import HomeHeader from '@modules/UI/components/HomeHeader'
import { NavigationProp, ParamListBase } from '@react-navigation/core'
import request from 'src/api/request'

interface QuestionProps {
    navigation: NavigationProp<ParamListBase>
    route: any
}

const Question: React.FC<QuestionProps> = ({ route }: QuestionProps) => {
    const { params } = route
    const question_id = params.id

    const [body, setBody] = useState('<h1>This is a static HTML source!</h1>')

    const getData = () =>
        request.get(`/questions/${question_id}?order=desc&sort=activity&site=stackoverflow&filter=!nKzQUR3Egv`)

    const getListRequest = useRequest(getData, {
        manual: true,
        loadMore: false,
    })

    useEffect(() => {
        console.log('useEffect')
        getListRequest.run().then((response) => setBody(response.items[0].body))
    }, [])

    console.log({ body })
    return (
        <View style={styles.container}>
            <HomeHeader />
            <Text>questions</Text>
            <WebView originWhitelist={['*']} source={{ html: body }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Question
