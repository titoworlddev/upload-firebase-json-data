const admin = require('firebase-admin');
const serviceAccount = require('./key_service_account.json');
const data = require('./data.jsonc');

const collectionKey = 'data'; //Name of the collection
// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Cloud Firestore
const firestore = admin.firestore();
// Enable timestamps
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Upload data
if (data && typeof data === 'object') {
  Object.keys(data).forEach(docKey => {
    firestore
      .collection(collectionKey)
      .doc(docKey)
      .set(data[docKey])
      .then(res => {
        console.log('Document ' + docKey + ' successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  });
}
