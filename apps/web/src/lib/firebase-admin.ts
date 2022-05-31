import { apps } from 'firebase-admin';
import { initializeApp, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    }),
    databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
  });
}

export const adminApp = getApp();
export const adminAuthApp = getAuth(adminApp);
