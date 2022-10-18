import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';

import CustomDropdown from './CustomDropdown';
import CustomButton from './CustomButton';

const topicsOfAppeal = [
    { label: 'Тема 1', value: 1 },
    { label: 'Тема 2', value: 2 },
    { label: 'Тема 3', value: 3 },
    { label: 'Тема 4', value: 4 },
    { label: 'Тема 5', value: 5 }
];

const subTopics = [
    [
        { label: 'Подтема 11', value: 11 },
        { label: 'Подтема 12', value: 12 },
        { label: 'Подтема 13', value: 13 },
        { label: 'Подтема 14', value: 14 },
        { label: 'Подтема 15', value: 15 }
    ],
    [
        { label: 'Подтема 21', value: 21 },
        { label: 'Подтема 22', value: 22 },
        { label: 'Подтема 23', value: 23 },
        { label: 'Подтема 24', value: 24 },
        { label: 'Подтема 25', value: 25 }
    ],
    [
        { label: 'Подтема 31', value: 31 },
        { label: 'Подтема 32', value: 32 },
        { label: 'Подтема 33', value: 33 },
        { label: 'Подтема 34', value: 34 },
        { label: 'Подтема 35', value: 35 }
    ],
    [
        { label: 'Подтема 41', value: 41 },
        { label: 'Подтема 42', value: 42 },
        { label: 'Подтема 43', value: 43 },
        { label: 'Подтема 44', value: 44 },
        { label: 'Подтема 45', value: 45 }
    ],
    [
        { label: 'Подтема 51', value: 51 },
        { label: 'Подтема 52', value: 52 },
        { label: 'Подтема 53', value: 53 },
        { label: 'Подтема 54', value: 54 },
        { label: 'Подтема 55', value: 55 }
    ],
];

const StartScreen = () => {
    const [input, setInput] = useState('');
    const [topic, setTopic] = useState(-1);
    const [subTopic, setSubTopic] = useState(-1);

    const [b, setB] = useState(false);

    const handleSubmit = () => {
        if (input && topic !== -1 && subTopic !== -1) {
            setB(true);
        }
    }

    useEffect(() => setSubTopic(-1), [topic])

    return (
        <View style={styles.wrapper}>
            <Text style={styles.heading}>Здравствуйте!</Text>
            <Text style={styles.info}>Чтобы встать в очередь и получить помощь заполните анкету ниже.</Text>

            <TextInput
                style={styles.input}
                onChangeText={value => setInput(value)}
                placeholder='Ф.И.О.'
            />

            <CustomDropdown
                placeholder='Выберите тему из списка'
                data={topicsOfAppeal}
                onChange={setTopic}
            />

            <CustomDropdown
                placeholder={topic === -1 ? 'Для начала выберите тему' : 'Выберите подтему из списка'}
                data={subTopics[topic - 1]}
                onChange={setSubTopic}
                disabled={topic === -1}
            />

            <CustomButton style={styles.button} onPressOut={handleSubmit} />

            {b && (
                <>
                    <Text>{input}</Text>
                    <Text>{topic}</Text>
                    <Text>{subTopic}</Text>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#333'
    },
    heading: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 30
    },
    info: {
        textAlign: 'center',
        width: '80%',
        fontSize: 16
    },
    input: {
        width: '80%',
        backgroundColor: '#000',
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 5
    },
    button: {
        marginTop: 30,
        transform: [{ scale: 1.1 }]
    }
})

export default StartScreen;
