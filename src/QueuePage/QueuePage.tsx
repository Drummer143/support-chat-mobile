import { User } from 'firebase/auth';
import { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useGetData from '../hooks/useGetData';
import { database } from '../firebase';
import { DataDialog } from '../types';

type Props = {
    navigation: NativeStackNavigationProp<any, 'queue', 'id'>;
    route: RouteProp<any, 'queue'>;
    user: User | null;
    dialogId: string | null
    setDialogId: Function
};

function QueuePage({ navigation, route, user, dialogId, setDialogId }: Props) {
    const [queueLength, setQueueLength] = useState(-1);

    useGetData(
        `clientsData/${user?.uid}/currentDialog`,
        (snap: DataSnapshot) => setDialogId(snap.val()),
        true
    );

    useGetData('dialogs', (snap: DataSnapshot) => {
        let dialogs: DataDialog[] = Object.values(snap.val());

        if (dialogId !== null) {
            const currentDialog = dialogs.find(dialog => dialog.dialogId === dialogId);
            if (currentDialog?.status !== 'queue') {
                navigation.navigate('chat');
            }
        }

        dialogs = dialogs.filter((dialog: any) => dialog.status === 'queue');

        setQueueLength(dialogs.length);
    });

    return (
        <View style={styles.wrapper}>
            {queueLength === -1 ? (
                <>
                    <Text style={styles.loaderText}>
                        Считаем вашу позицию в очереди, подождите пожалуйста.
                    </Text>
                </>
            ) : (
                <>
                    <Text>Длина очереди: {queueLength}.</Text>
                    <Text>
                        С вами свяжутся примерно через {queueLength * 5}-{queueLength * 15} минут.
                    </Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    loaderText: {
        width: '70%',
        textAlign: 'center'
    }
});

export default QueuePage;
