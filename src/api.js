import {
   initializeApp, getApp 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

import {
   getFirestore,
   collection,
   updateDoc,
   addDoc,
   deleteDoc,
   getDocs,
   getDoc,
   doc,
   query,
   where,
   orderBy,
   Timestamp
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, uploadString } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

//Config
const firebaseConfig = {
   apiKey: "AIzaSyChus6VuhaCFlZzdieJF9xyvjzkLi045YA",
   authDomain: "school-app-d68b8.firebaseapp.com",
   projectId: "school-app-d68b8",
   storageBucket: "school-app-d68b8.appspot.com",
   messagingSenderId: "25534545863",
   appId: "1:25534545863:web:c8a1a2819de62374a6e3e2",
   measurementId: "G-MP998X4K24"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("db\n", db);

// Get Firebase App for storage
const firebaseApp = getApp();
console.log("firebaseApp\n", firebaseApp);
// Get a non-default bucket from a custom firebase.app.App
const storage2 = getStorage(firebaseApp, "gs://school-app-d68b8.appspot.com");
console.log("storage2\n", storage2);

const storage = getStorage();
const storageRef = ref(storage, 'school-app');
console.log("storageRef\n", storageRef);

//**************Uploaded a blob or file */
// 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });
//**************Uploaded a file */
// const message = 'This is my message.';
// uploadString(storageRef, message).then((snapshot) => {
//   console.log('Uploaded a raw string!');
// });

//=================================================================
//=================================================================
   /********************************/
   /*Get the whole task by default from the databases */
   /********************************/
   const getStudents = async (db) => {
      const tasksCollection = collection(db, 'students');
      const taskSnapshot = await getDocs(tasksCollection);
      let students = taskSnapshot.docs.map(doc => {
         return {
            "data": doc.data(),
            "id": doc.id
         }
      });
      return students
   }
   getStudents(db).then(students => {
      //Display All the students
      console.log(students);
   });