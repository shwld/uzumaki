import { apps } from 'firebase-admin';
import { initializeApp, applicationDefault, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!apps.length) {
  initializeApp({
    credential: applicationDefault(),
    databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL,
  });
}

export const adminApp = getApp();
export const adminAuthApp = getAuth(adminApp);
