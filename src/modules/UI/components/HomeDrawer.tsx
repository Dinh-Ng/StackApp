import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import metrics from '@styles/metrics'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import { themeActions } from '@store/slices/theme.slice'

interface HomeDrawerProps {
    navigation: any
}

const HomeDrawer: React.FC<HomeDrawerProps> = ({navigation}: HomeDrawerProps) => {
    const [index, setIndex] = useState<Number>(0)
    const dispatch = useDispatch()

    const Children = ({ indexC, icon, iconSize, name, onPress }: any) => {
        return (
            <TouchableOpacity
                style={[styles.childrenContainer, index === indexC && styles.childrenContainerSelected]}
                onPress={() => onPress()}
            >
                <Icon name={icon} size={iconSize || 20} color="#acb2b8" />
                <Text children={name} style={styles.childrenText} />
            </TouchableOpacity>
        )
    }

    const changeTheme = () => {
        dispatch(themeActions.toggleTheme())
    }

    return (
        <ScrollView style={styles.container}>
            <Children onPress={() => navigation.closeDrawer()} icon="close" iconSize={28} />
            <Text children="PUBLIC" style={styles.groupText} />
            <Children indexC={0} onPress={() => setIndex(0)} icon="globe" name="Stack Overflow" />
            <Children indexC={1} onPress={() => setIndex(1)} icon="tag" name="Tags" />
            <Children indexC={2} onPress={() => setIndex(2)} icon="user-circle-o" name="Users" />
            <Text children="FIND A JOB" style={styles.groupText} />
            <Children indexC={3} onPress={() => setIndex(3)} name="Jobs" />
            <Children indexC={4} onPress={() => setIndex(4)} name="Companies" />
            <Text children="SETTINGS" style={styles.groupText} />
            <Children indexC={4} onPress={() => changeTheme()} name="Change Themes" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: metrics.safeTopPadding,
        backgroundColor: '#2d2d2d',
        flex: 1,
    },
    groupText: {
        color: '#acb2b8',
        paddingHorizontal: 8,
        paddingTop: 40,
        paddingBottom: 10,
    },
    childrenContainer: {
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 20,
    },
    childrenContainerSelected: {
        borderRightWidth: 3,
        borderRightColor: 'rgb(244,128,36)',
        backgroundColor: 'rgb(61,61,60)',
    },
    childrenText: {
        color: '#acb2b8',
        fontWeight: 'bold',
        paddingLeft: 5,
    },
})

export default HomeDrawer
