import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
import  {getStorage} from 'firebase/storage';

import { CONFIG } from '../config/constant';

if (!firebase.apps.length) {
  firebase.initializeApp(CONFIG.firebase);
}

export default firebase;
export const storage = getStorage()
export const db = getFirestore()
