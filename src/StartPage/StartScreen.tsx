import * as uuid from 'react-native-uuid';
import { ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

import CustomButton from './CustomButton';
import CustomDropdown from './CustomDropdown';
import { database } from '../firebase';
import { topicsOfAppeal, subTopics } from './topics';

const StartScreen = () => {
    const [nameInput, setNameInput] = useState('');
    const [topic, setTopic] = useState(-1);
    const [subTopic, setSubTopic] = useState(-1);

    const [b, setB] = useState(false);

    const handleSubmit = () => {
        if (nameInput && topic !== -1 && subTopic !== -1 && !b) {

            const id = uuid.default.v4();

            const newDialog = {
                userName: nameInput,
                operatorId: -1,
                status: 'queue',
                messages: [
                    {
                        content: topic,
                        timestamp: (new Date()).getTime(),
                        writtenBy: 'client'
                    },
                    {
                        content: subTopic,
                        timestamp: (new Date()).getTime(),
                        writtenBy: 'client'
                    }
                ]
            };

            update(ref(database), { [`dialogs/${id}`]: newDialog })

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
                onChangeText={value => setNameInput(value)}
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
                    <Text>{nameInput}</Text>
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
