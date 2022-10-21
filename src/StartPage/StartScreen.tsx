import * as uuid from 'react-native-uuid';
import { ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

import CustomButton from './CustomButton';
import CustomDropdown from './CustomDropdown';
import { database } from '../firebase';
import { topicsOfAppeal, subTopics } from './topics';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { auth } from './../firebase';
import { RouteProp } from '@react-navigation/native';
import { signOut, User } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type Props = {
    navigation: NativeStackNavigationProp<any, "create-issue", "id">
    route: RouteProp<any, "create-issue">
    user: User | null
}

const StartScreen = ({ navigation, user }: Props) => {
    const [nameInput, setNameInput] = useState('');
    const [topic, setTopic] = useState(-1);
    const [subTopic, setSubTopic] = useState(-1);

    const handleSubmit = () => {
        if (nameInput && topic !== -1 && subTopic !== -1) {

            const id = uuid.default.v4();
            const timestamp = (new Date()).getTime();

            const newDialog = {
                dialogId: id,
                userName: nameInput,
                operatorId: -1,
                status: 'queue',
                messages: [
                    {
                        content: topic,
                        timestamp,
                        writtenBy: 'client'
                    },
                    {
                        content: subTopic,
                        timestamp,
                        writtenBy: 'client'
                    }
                ]
            };

            const dbRef = ref(database);

            update(dbRef, { [`dialogs/${id}`]: newDialog });

            update(dbRef, { [`clientsData/uuid/currentDialog`]: id })

            navigation.navigate('queue');
        }
    }

    const handleLogOut = () => {
        signOut(auth);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    }

    console.log(user);

    useEffect(() => setSubTopic(-1), [topic])

    return (
        <View style={styles.wrapper}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user?.displayName || 'your user name'}</Text>
                <CustomButton style={styles.logoutButton} text='Выйти' onPressIn={handleLogOut} />
            </View>

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

            <CustomButton text='Отправить' style={styles.button} onPressOut={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000'
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
        backgroundColor: '#333',
        marginTop: 20,
        paddingLeft: 10,
        borderRadius: 5
    },
    button: {
        marginTop: 30,
        transform: [{ scale: 1.1 }]
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 15
    },
    userName: {
        borderRadius: 10,
        backgroundColor: '#fff',
        color: '#000',
        padding: 5,
        fontSize: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    logoutButton: {
        backgroundColor: 'red',
        color: '#000',
        width: '20%',
        height: 22,
        marginTop: 4
    }
})

export default StartScreen;
