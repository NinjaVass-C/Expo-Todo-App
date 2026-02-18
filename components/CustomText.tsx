import {Text, StyleSheet, type TextProps} from 'react-native'

/**
 * Custom text component used to style consistently used <Text> tags
 * throughout the application
 *
 */



export type CustomTextStyles = TextProps & {
    type?: 'title' | 'subtitle' | 'error' | 'default' | 'buttonText'
}

export function CustomText({type = 'default', ...rest}: CustomTextStyles) {
    return (
        <Text
            style={[
                type === 'title' ? styles.title : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'error' ? styles.error : undefined,
                type === 'default' ? styles.default : undefined,
                type === 'buttonText' ? styles.buttonText : undefined,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginBottom: 10,
    },
    error: {
        color: '#dc0000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
})
