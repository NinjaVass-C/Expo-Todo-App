import {View, StyleSheet, type ViewProps} from 'react-native'

/**
 * Custom View component used to style consistently used <View> tags throughout the application.
 */


export type CustomViewStyles = ViewProps & {
    type?: 'title' | 'error' | 'default' | 'content' | 'buttons' | 'inputs' | 'footer' | 'scrollContainer'
}

export function CustomViews({type = 'default', ...otherProps}: CustomViewStyles) {
    return (
        <View
            style={[
                type === 'title' ? styles.title : undefined,
                type === 'error' ? styles.error : undefined,
                type === 'default' ? styles.default : undefined,
                type === 'content' ? styles.content : undefined,
                type === 'buttons' ? styles.buttons : undefined,
                type === 'inputs' ? styles.inputs : undefined,
                type === 'footer' ? styles.footer : undefined,
                type === 'scrollContainer' ? styles.scrollContainer: undefined,
            ]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginVertical: '5%'
    },
    error: {
        alignContent: 'center',
    },
    content: {
        flex: 2,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        minWidth: '80%',
    },
    inputs: {
        flex: 2,
        marginBottom: '5%',
        alignItems: 'center',
        minWidth: '100%',
        justifyContent: 'space-evenly',
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: '10%',
        maxHeight: '20%'
    },
    scrollContainer: {
        flex: 6,
        width: '100%',
    }
})

