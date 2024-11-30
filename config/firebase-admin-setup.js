const admin = require('firebase-admin');
const serviceAccount = require("./../serviceAccountKey.json"); // Download this from Firebase Console under Project Settings -> Service Accounts
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: serviceAccount.authDomain,
  projectId: serviceAccount.project_id,
  storageBucket: serviceAccount.storageBucket,
  messagingSenderId: serviceAccount.messagingSenderId,
  appId: serviceAccount.appId,
});
const authClient = getAuth(app);


module.exports = {
  admin,
  authClient
};
