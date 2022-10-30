import { auth } from './../firebase';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

type Props = NativeStackScreenProps<any, 'login', 'id'>;

function LoginPage({ navigation }: Props) {
    const handleSignIn = async () => {
        try {
            const hasGooglePlay = await GoogleSignin.hasPlayServices();
            if (hasGooglePlay) {
                const userInfo = await GoogleSignin.signIn();
                const credential = GoogleAuthProvider.credential(userInfo.idToken);
                signInWithCredential(auth, credential).then(() =>
                    navigation.navigate('create-issue')
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const signOut = async () => {
        await GoogleSignin.signOut();
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1089625819670-2536dfk9m8anm5ka12q5cokbt4aa4ib0.apps.googleusercontent.com'
        });
    }, []);

    return (
        <View style={styles.wrapper}>
            <GoogleSigninButton onPress={handleSignIn} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    loginButton: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18
    }
});

export default LoginPage;
