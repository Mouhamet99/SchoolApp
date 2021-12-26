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
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

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

//**************Uploaded a blob or file */
// 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
// });
//**************Uploaded a file */
// const message = 'This is my message.';
// uploadString(storageRef, message).then((snapshot) => {
// });

//*=================================================================
//*=================================================================

/********************************/
//Get the whole students from the databases/
/********************************/
export const getStudents = async () => {
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
   }
}



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
   "created_at": Timestamp.fromDate(new Date())
}
//updateStudent("RNteYV3uOo44cTUARnTK", student);

/********************************/
/*Remove a student from firestore database */
/********************************/

async function removeStudent(id) {
   try {
      await deleteDoc(doc(db, "students", id)).then(() => alert('Student Removed Successfully😎😎👍👍'));
   } catch (e) {
      console.error("Error Deleting student: ", e);
      alert("Error Deleting student🤦‍♂️🤷‍♀️🤷‍♀️");
   }
}
//removeStudent("vcSLdIpa92Wf2kZbRNvF")

/********************************/
/*Insert a student from firestore database */
/********************************/
export const addStudent = async (newStudent) => {
   try {

      await uploadFiles(newStudent['data'].image).then(urldata => {
         newStudent['data']['image'] = { name: newStudent['data']['fileName'], url: urldata }

         delete newStudent['data'].url
         delete newStudent['data'].fileName
      }).then(() => {

         addDoc(collection(db, "students"), {
            ...newStudent['data'],
            "created_at": Timestamp.fromDate(new Date()),
            "skills": newStudent['data']['skills'].map(skill => JSON.stringify(skill))
         });

      })

   } catch (e) {
      console.error("Error adding student: ", e);
   }


}
// addStudent(student)

/********************************/
/*Uppload file */
/********************************/

export const uploadFiles = async (file) => {
   //
   if (!file) return;
   const storage = getStorage();
   // let url = window.URL.createObjectURL(file.files[0])
   const storageRef = ref(storage, `userProfiles/${file.name}`);
   let downloadURL = ""
   await uploadBytes(storageRef, file).then((snapshot) => getDownloadURL(snapshot.ref)).then(URL => {
      downloadURL = URL
   });
   return downloadURL
};
