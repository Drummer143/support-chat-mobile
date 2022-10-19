import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { DataSnapshot } from 'firebase/database';
import { useGetQueueLength } from './useGetQueueLenth';

function Queue() {
    const [queueLength, setQueueLength] = useState(-1);

    useGetQueueLength((snap: DataSnapshot) => {
        let dialogs = Object.values(snap.val());

        dialogs = dialogs.filter((dialog: any) => dialog.status === 'queue');

        setQueueLength(dialogs.length);
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            {queueLength === -1 ? (
                <>
                    <Text style={{ width: '70%', textAlign: 'center' }}>Считаем вашу позицию в очереди, подождите пожалуйста.</Text>
                </>
            ) : (
                <>
                    <Text>Длина очереди: {queueLength}.</Text>
                    <Text>С вами свяжутся примерно через {queueLength * 5}-{queueLength * 15} минут.</Text>
                </>
            )
            }
        </View >
    )
}

export default Queue;