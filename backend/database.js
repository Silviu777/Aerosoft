const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./firestore-key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const database = getFirestore();

module.exports = database
