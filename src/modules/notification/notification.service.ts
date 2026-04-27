import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

const credentialPath =
  process.env.FIREBASE_CREDENTIAL_PATH || '../../firebase-key.json';

if (fs.existsSync(path.resolve(__dirname, credentialPath))) {
  const credential = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, credentialPath), 'utf-8'),
  );
  admin.initializeApp({
    credential: admin.credential.cert(credential),
  });
}

@Injectable()
export class NotificationService {
  async send(token: string, title: string, body: string) {
    await admin.messaging().send({
      token,
      notification: { title, body },
    });
  }
}
