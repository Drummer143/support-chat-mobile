
import { off, onValue, ref } from 'firebase/database';
import { database } from '../firebase';
import { useEffect } from 'react';

export const useGetQueueLength = (handleData: Function) => {
    const dbRef = ref(database, 'dialogs');

    useEffect(() => {
        onValue(dbRef, snapshot => handleData(snapshot));

        return () => off(dbRef);
    })
}