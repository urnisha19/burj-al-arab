import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase';
import React, { useContext } from 'react';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const history= useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email: email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sing in</button>
        </div>
    );
};

export default Login;