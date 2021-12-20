import React from 'react'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { decode } from 'html-entities'

import { DARK_THEME } from '@styles/colors'
import { sizing } from '@styles/fonts'

interface StyledTextProps extends TextProps {
    text: string
    customStyle?: StyleProp<TextStyle>
}

const StyledText: React.FC<StyledTextProps> = (props: StyledTextProps) => {
    return (
        <Text style={[styles.text, props.customStyle]} {...props}>
            {decode(props.text)}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: DARK_THEME.DARK,
        fontSize: sizing.MEDIUM,
    },
})

export default StyledText
