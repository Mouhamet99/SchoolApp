import { initializeApp } from 'firebase/app';

import {
   getFirestore,
   collection,
   updateDoc,
   addDoc,
   deleteDoc,
   getDocs,
   getDoc,
   orderBy,
   query,
   doc,
   Timestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
// import 'regenerator-runtime/runtime'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//*=================================================================
//*=================================================================

/********************************/
//Get the whole students from the databases/
/********************************/
export const getStudents = async () => {
   try {
      // const studentsCollection = collection(db, 'students');
      // const studentSnapshot = await getDocs(studentsCollection);

      // let students = studentSnapshot.docs.map(doc => {
      //    return {
      //       "data": doc.data(),
      //       "id": doc.id
      //    }
      // });

      // return students
      const studentsCollection = collection(db, 'students');
      const q = await query(studentsCollection, orderBy("created_at", "asc"));
      const querySnapshot = await getDocs(q);
      let studentsList = []
      querySnapshot.forEach((doc) => {
         studentsList.push({
            id: doc.id,
            data: doc.data()
         })
      });
      return studentsList;



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

/********************************/
/*Uppload file */
/********************************/

export const uploadFiles = async (file) => {
   //
   if (!file) return;
   const storage = getStorage();
   const storageRef = ref(storage, `userProfiles/${file.name}`);
   let downloadURL = ""
   await uploadBytes(storageRef, file).then((snapshot) => getDownloadURL(snapshot.ref)).then(URL => {
      downloadURL = URL
   });

   return downloadURL
};
