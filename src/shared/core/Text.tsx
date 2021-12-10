import React from 'react'

import styled from 'styled-components/native'

import { sizing, styling } from '@styles/fonts'

import { TextProps, Styled } from '@core/types'

const Entities = require('html-entities').AllHtmlEntities

interface weightProps {
    LIGHT: string
    REGULAR: string
    MEDIUM: string
    BOLD: string
}

interface sizingProps {
    SMALLEST: number
    SMALLER: number
    SMALL: number
    MEDIUM: number
    LARGE: number
    LARGER: number
    LARGEST: number
}

const Text = ({ children, type, ...props }: TextProps) => {
    const entities = new Entities()
    const renderComponent = (style: TextProps = {}) => (
        <StyledText {...style} {...props}>
            {/* {typeof children === 'string' ? children?.replace(/&quot;/gi, '"') : children} */}
            {entities.decode(children)}
        </StyledText>
    )

    switch (type) {
        case 'label':
            return renderComponent({
                color: 'DARK',
                weight: 'LIGHT',
                size: 'SMALL',
            })
        case 'title':
            return renderComponent({
                color: 'DARKEST',
                weight: 'REGULAR',
                size: 'LARGE',
            })

        default:
            return renderComponent()
    }
}

const StyledText = styled.Text<Styled<TextProps>>`
    color: ${({ theme, color }: { theme: any; color: any }) => theme[color || 'DARKEST']};
    font-size: ${(size: keyof sizingProps) => (typeof size === 'string' ? sizing[size] : size) || sizing.MEDIUM}px;
    font-family: ${(weight: keyof weightProps) => styling[weight || 'LIGHT']};
`

export default Text
