import admin from "firebase-admin";
import { readFileSync } from "fs";

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export async function handler(event, context) {
  try {
    const snapshot = await db.collection('students').get();
    const students = snapshot.docs.map(doc => doc.data());
    
    return {
      statusCode: 200,
      body: JSON.stringify(students),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch students' }),
    };
  }
}