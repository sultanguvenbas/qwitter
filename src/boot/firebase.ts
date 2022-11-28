import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDbQLHrEJ3Tu1JMW4WfNgeD6KskGHPkft4",
    authDomain: "qwitter-c4db7.firebaseapp.com",
    projectId: "qwitter-c4db7",
    storageBucket: "qwitter-c4db7.appspot.com",
    messagingSenderId: "414497764400",
    appId: "1:414497764400:web:db3d7e957ffdecdc7769f5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db