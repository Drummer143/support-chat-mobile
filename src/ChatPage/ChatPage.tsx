import { User } from 'firebase/auth';
import { database } from '../firebase';
import { useRef, useState } from 'react';
import { DataDialog, DataMessage } from '../types';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { DataSnapshot, ref, update } from 'firebase/database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import useGetData from '../hooks/useGetData';
import CustomButton from '../CreateIssuePage/CustomButton';

type Props = {
    user: User;
    route: RouteProp<ParamListBase, 'chat'>;
    navigation: NativeStackNavigationProp<any, 'chat', 'id'>;
};

function ChatPage({ user }: Props) {
    const [input, setInput] = useState('');
    const [dialog, setDialog] = useState<DataDialog | null>(null);
    const [dialogId, setDialogId] = useState<null | string>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSubmit = () => {
        const message: DataMessage = {
            content: input,
            timestamp: new Date().getTime(),
            writtenBy: `c_${user.uid}`
        };

        update(ref(database), {
            [`dialogs/${dialogId}/messages/${dialog?.messages.length || 0}`]: message
        });

        scrollViewRef.current?.scrollToEnd();

        setInput('');
    };

    useGetData(
        `clientsData/${user.uid}/currentDialog`,
        (snap: DataSnapshot) => setDialogId(snap.val()),
        true
    );

    useGetData(`dialogs/${dialogId}`, (snap: DataSnapshot) => setDialog(snap.val()));

    return (
        <View style={styles.wrapper}>
            <View style={styles.chatInfo}>
                <Text style={styles.operatorName}>operator name</Text>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.messagesList}>
                {dialog?.messages.map(({ content, timestamp, writtenBy }: DataMessage, i) => (
                    <Text
                        style={{
                            ...styles.message,
                            marginBottom: i === dialog.messages.length - 1 ? 10 : 0,
                            alignSelf: writtenBy.startsWith('c') ? 'flex-end' : 'flex-start'
                        }}
                        key={`${timestamp}${i}`}
                    >
                        {content}
                    </Text>
                ))}
            </ScrollView>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="type a message"
                    value={input}
                    onChangeText={value => setInput(value)}
                    style={styles.inputField}
                ></TextInput>
                <CustomButton
                    text="Send"
                    style={styles.sendButton}
                    onPressOut={handleSubmit}
                ></CustomButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    chatInfo: {
        backgroundColor: '#666',
        width: '100%',
        maxHeight: 50,
        minHeight: 50,
        paddingTop: 10
    },
    operatorName: {
        fontSize: 20,
        width: '100%',
        textAlign: 'center'
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 10,
        overflow: 'scroll'
    },
    message: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        maxWidth: '60%'
    },
    clientMessage: {
        alignSelf: 'flex-end'
    },
    operatorMessage: {
        alignSelf: 'flex-start'
    },
    inputWrapper: {
        width: '100%',
        maxHeight: 60,
        minHeight: 60,
        padding: 10,
        backgroundColor: '#aaa',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputField: {
        width: '85%',
        backgroundColor: '#222',
        borderRadius: 10,
        fontSize: 16,
        paddingHorizontal: 10
    },
    sendButton: {
        width: '13%',
        height: '70%',
        marginLeft: '2%',
        backgroundColor: 'green'
    }
});

export default ChatPage;
