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

// Get Firebase App for storage
const firebaseApp = getApp();

const storage = getStorage();
const storageRef = ref(storage, 'school-app');

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

//*=================================================================
//*=================================================================

   /********************************/
   //Get the whole students from the databases/
   /********************************/
   const getStudents = async (db) => {
      try {
         const studentsCollection = collection(db, 'students');
         const studentSnapshot = await getDocs(studentsCollection);

         let students = studentSnapshot.docs.map(doc => {
            return {
               "data": doc.data(),
               "id": doc.id
            }
         });

         return students
      } catch (error) {
         console.log("Error  student👇👇\n");
         console.log(error);
      }
   }
   getStudents(db).then(students => {
      //Display All the students
      console.log(students);
   });

   
   /********************************/
   //Update a students in databases /
   /********************************/
   const updateStudent = async function (id, studentUpdated) {
      try {
         const student = await getDoc(doc(db, "students", id))

         await updateDoc(doc(db, "students", id), {
            ...studentUpdated
         })
      } catch (e) {
         alert("Error Updating student👉👉\n");
         console.log("Error Updating student👇👇\n",e);
      }
   }
   // "created_at": {
   //    "seconds": 1640262000,
   //    "nanoseconds": 0
   // },
   const student = {
      "first_name": "Maman",
      "skills": [
         "{\"frontend\":50}",
         "{\"backend\":80}",
         "{\"API\":80}"
      ],
      "level": "debutant",
      "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quo eum ea exercitationem ex. Eaque at eum saepe? Odit, sunt.",
      "last_name": "DIOP",
      "created_at":  Timestamp.fromDate(new Date())
      }
   //updateStudent("RNteYV3uOo44cTUARnTK", student);

   /********************************/
   /*Remove a student from firestore database */
   /********************************/

   async function removeStudent(id) {
      try {
         await deleteDoc(doc(db, "students", id)).then(() =>alert('Student Removed Successfully😎😎👍👍'));
      } catch (e) {
         console.error("Error Deleting student: ", e);
         alert("Error Deleting student🤦‍♂️🤷‍♀️🤷‍♀️");
      }
   }
   //removeStudent("vcSLdIpa92Wf2kZbRNvF")

   /********************************/
   /*Insert a student from firestore database */
   /********************************/
   async function addStudent(newStudent) {
      try {
         const studentRef = await addDoc(collection(db, "students"), {
            ...newStudent
         });
         const studentObj = await getDoc(doc(db, "students", studentRef.id)).then(() =>alert('Student Added Successfully😎😎👍👍'))
      } catch (e) {
         console.error("Error adding student: ", e);
      }
   }
   // addStudent(student)

