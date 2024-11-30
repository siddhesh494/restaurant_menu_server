const admin = require('firebase-admin');
const serviceAccount = require("./../serviceAccountKey.json");
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

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
const db = getFirestore(app)

module.exports = {
  admin,
  authClient,
  db
};
