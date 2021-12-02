import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'

interface HomeHeaderProps {
    onPressMenu?(): any
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onPressMenu }: HomeHeaderProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressMenu}>
                <Icon name="menu" size={28} color="#9fa6ad" style={styles.menuIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#393939',
        flexDirection: 'row',
    },
    menuIcon: {
        padding: 10,
    },
})

export default HomeHeader
