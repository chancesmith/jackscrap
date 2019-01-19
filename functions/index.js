const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const twilio = require('twilio');

const firebaseConfig = functions.config();
const accountSid = firebaseConfig.twilio.sid;
const authToken = firebaseConfig.twilio.token;

const client = new twilio(accountSid, authToken);

const twilioNumber = '+17312019005'; // your twilio phone number

/// start cloud function

exports.textStatus = functions.database.ref('/jackson/{pickupKey}/pickupComplete').onUpdate((snapshot, context) => {
  const pickupKey = context.params.pickupKey;

  return admin
    .database()
    .ref(`/jackson/${pickupKey}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(pickup => {
      const status = pickup.pickupComplete;
      const phoneNumber = pickup.phone;

      if (!validE164(phoneNumber)) {
        throw new Error('number must be E164 format!');
      }

      if (status) {
        const textMessage = {
          body: `Good news! The ${pickup.pickupType} have been collected from ${pickup.address} ${
            pickup.zip
          }. - JACKSCRAP 🚛`,
          to: phoneNumber, // Text to this number
          from: twilioNumber, // From a valid Twilio number
        };

        return client.messages.create(textMessage);
      } else {
        return 0;
      }
    })
    .then(message => console.log(message.sid, 'success'))
    .catch(err => console.log(err));
});

/// Validate E164 format
function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}
