import { getStudents } from './api.js'

window.onload = function () {
   const cardContainer = document.querySelector('#students_container')



   const addCard = (student, index) => {

      const card = `
      <div class="col">
            <div class="card bg-light p-3 m-2 stduents-card"  id="${student.id}">
               <div class="row">
                  <div class="d-flex flex-row align-items-center" >
                     <!-- <div class="icon"> <i class="fa fa-twitter"></i> </div> -->
                     <div class="icon"> <img class="profile-user-img rounded-circle img-fluid"
                           src="${student['data']['image']['url']}" alt="student profile image"> </div>
                     <div class="ms-2 c-details">
                        <h6 class="mb-0" data-last-name="${student['data'].last_name}" data-first-name="${student['data'].first_name}" >${student['data'].first_name} ${student['data'].last_name}</h6>
                        <strong>Debutant</strong>
                     </div>
                     <div class="d-inline rounded p-1 ms-auto align-self-start">
                        <a class="border-0 btn-transition btn btn-sm btn-outline-warning  edit_student" id="edit-student-${student.id}"
                        title="editer etudiant"><i class="fa fa-edit"></i>
                        </a>
                        <a class="border-0 btn-transition btn btn-sm btn-outline-danger remove_student" id="remove-student-${student.id}"
                           title="supprimer etudiant"><i class="fa fa-trash"></i>
                        </a>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="mt-3">
                     <strong class="d-block">Biographie</strong>
                     <span class="text-muted">${student['data'].bio}</span>
                  </div>
               </div>
            </div>
         </div>
   `;

      cardContainer.insertAdjacentHTML('beforeend', card)

      // document.getElementById(`edit-student-${student.id}`).addEventListener('click', () => {

      //    lastName.value = student["data"].last_name
      //    firstName.value = student["data"].first_name
      //    bio.value = student["data"].bio
      //    level.value = student["data"].level
      //    file.files[0] = { ...student["data"].image }
      //    // levelOption.selected = true

      //    btnFormSubmit.classList.add('d-none')
      //    btnFormEdit.classList.remove('d-none')
      //    btnFormEdit.setAttribute('data-card-to-update', student.id)
      // })
      // document.getElementById(`remove-student-${student.id}`).addEventListener('click', () => {
      //    removeStudent(student.id, index)
      // })
   }
   getStudents().then((students) => {
      students.forEach((student, index) => {
         addCard(student, index)
      });
   });


}