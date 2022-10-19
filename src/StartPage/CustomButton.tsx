import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    style?: StyleMedia | null

    onPressIn?: Function | null
    onPressOut?: Function | null
}

const CustomButton = ({ style = null, onPressIn = null, onPressOut = null }: Props) => {
    const [active, setActive] = useState(false);

    const handlePressIn = () => {
        setActive(true);

        if(onPressIn) {
            onPressIn();
        }
    }

    const handlePressOut = () => {
        setActive(false);

        if (onPressOut) {
            onPressOut();
        }
    }

    return (
        <TouchableOpacity
            style={[styles.wrapper, style, active && styles.active]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text>Отправить</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '40%',
        backgroundColor: '#3a5199',
        height: 30,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    active: {
        backgroundColor: '#000'
    }
})

export default CustomButton;