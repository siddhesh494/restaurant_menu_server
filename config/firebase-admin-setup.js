const admin = require('firebase-admin');
// const serviceAccount = require("./../serviceAccountKey.json");
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

const serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
  "universe_domain": process.env.universe_domain
}


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
