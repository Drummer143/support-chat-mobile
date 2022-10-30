
import { off, onValue, ref } from 'firebase/database';
import { database } from '../firebase';
import { useEffect } from 'react';

const useGetData = (path: string, handleData: Function, onlyOnce = false) => {
    const dbRef = ref(database, path);

    useEffect(() => {
        onValue(dbRef, snapshot => handleData(snapshot), { onlyOnce });

        return () => off(dbRef);
    })
}

export default useGetData;