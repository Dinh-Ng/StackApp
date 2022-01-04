import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useRequest } from 'ahooks'

import { sizing } from '@styles/fonts'
import metrics from '@styles/metrics'
import request from 'src/api/request'
import { logger } from 'src/utilities/logger'
import HomeHeader from '@modules/UI/components/HomeHeader'
import StyledText from 'src/shared/components/StyledText'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface HomeProps {
    navigation: NavigationProp<ParamListBase> & DrawerNavigationProp<ParamListBase>
    route: any
}

interface ItemProps {
    question_id: Number
    score: Number
    answer_count: Number
    view_count: Number
    is_answered: boolean
    title: string
    tags: string[]
}

const Home: React.FC<HomeProps> = ({ navigation, route }: HomeProps) => {
    const getListApi = () => request.get('/questions?order=desc&sort=votes&site=stackoverflow')

    const getListRequest = useRequest(getListApi, {
        manual: true,
        loadMore: false,
    })

    logger('route', false, route)

    const renderItem = (item: ItemProps) => {
        return (
            <TouchableWithoutFeedback
                style={styles.item}
                onPress={() => navigation.navigate('Question', { id: item.question_id })}
            >
                <View style={styles.voteContainer}>
                    <Text children={item?.score + ' votes'} style={styles.voteText} />
                    <Text
                        children={item?.answer_count + (item?.answer_count > 1 ? ' answers' : ' answer')}
                        style={[
                            styles.voteText,
                            item?.answer_count > 0 && styles.answerText,
                            item?.is_answered && styles.answerAcceptText,
                        ]}
                    />
                    <Text children={item?.view_count + ' views'} style={styles.voteText} />
                </View>
                <StyledText text={item?.title} customStyle={styles.title} />
                <View style={styles.tagContainer}>
                    {item?.tags?.map((tag: any, index: number) => (
                        <View style={styles.tag} key={index}>
                            <Text children={tag} style={styles.tagText} />
                        </View>
                    ))}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    useEffect(() => {
        getListRequest.run()
    }, [])

    logger('data', false, getListRequest.data)

    return (
        <View style={styles.container}>
            <HomeHeader onPressMenu={() => navigation.openDrawer()} />
            <FlatList
                style={styles.list}
                data={getListRequest.data?.items}
                renderItem={(item) => renderItem(item?.item)}
                keyExtractor={(_item, index) => index.toString()}
                refreshing={getListRequest.loading}
                onRefresh={() => getListRequest.run()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: metrics.safeTopPadding,
    },
    list: {
        // flex: 1,
        backgroundColor: '#000',
        paddingBottom: 50,
    },
    item: {
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderColor: '#393939',
        padding: 12,
    },
    title: {
        color: '#3ca4ff',
        fontWeight: '400',
        fontSize: sizing.MEDIUM,
        paddingVertical: 8,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#3e4a52',
        paddingVertical: 2,
        paddingHorizontal: 3,
        marginHorizontal: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tagText: {
        fontSize: sizing.SMALLER,
        color: '#9cc3db',
    },
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    voteText: {
        color: '#9fa6ad',
        fontSize: sizing.SMALLER,
        fontWeight: 'bold',
        marginRight: 5,
    },
    answerText: {
        color: '#63b47c',
        borderColor: '#63b47c',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    answerAcceptText: {
        backgroundColor: '#5a9e6f',
        color: '#fff',
    },
})

export default Home
