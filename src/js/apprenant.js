import { getStudents } from './api.js'

window.onload = function () {
   let STUDENTS = []
   const cardContainer = document.querySelector('#students_container')
   const addCard = (student, index) => {

      const card = `
      <div class="col">
            <div class="card bg-light p-3 m-2 stduents-card"  id="${student.id}">
               <div class="row">
                  <div class="d-flex flex-row align-items-center" >
                     
                     <div class="icon border border-4 border-secondary rounded-circle shadow-sm d-flex"> 
                     <img class="rounded-circle img-fluid sp-img-cover"
                           src="${student['data']['image']['url']}" alt="student profile image">
                            </div>
                     <div class="ms-2 c-details">
                        <h6 class="mb-0" data-last-name="${student['data'].last_name}" data-first-name="${student['data'].first_name}" >${student['data'].first_name} ${student['data'].last_name}</h6>
                        <strong class="lead fs-6">Debutant</strong>
                     </div>
                     
                     <button id="detail" class="btn-detail ms-auto align-self-start rounded btn btn-outline-secondary btn-sm px-2 py-0" data-card-detail="${student.id}">Detail</button>

                  </div>
               </div>
               <div class="row">
                  <div class="mt-3">
                     <strong class="d-block fw-normal text-uppercase text-decoration-underline">Biographie:</strong>
                     <span class="text-muted">${student['data'].bio}</span>
                  </div>
               </div>
            </div>
         </div>
   `;

      cardContainer.insertAdjacentHTML('beforeend', card)

      const cardElement = document.querySelector(`.card[id="${student.id}"]`)
      cardElement.querySelector(`.btn-detail`).addEventListener('click', (e) => {
         e.preventDefault()
         updateDetailModal(student.data)

      })
   }
   getStudents().then((students) => {
      
      STUDENTS = students;
      students.forEach((student, index) => {
         addCard(student, index)
         if (students.length - 1 === index) {
            document.querySelector('.center-page').classList.add('d-none')
         }
      });
   });
   const updateDetailModal = (student) => {
      const modal = document.querySelector('#detail-modal')
      const modalTrigger = document.querySelector('[data-bs-target="#detail-modal"]')
      const profile = modal.querySelector('#profil')
      const username = modal.querySelector('#username')
      const level = modal.querySelector('#level')
      const bio = modal.querySelector('#bio')
      const skills = modal.querySelector('#skills')
      const colors = ["primary", "warning", "danger", "info","success"]

      profile.src = student['image']['url']
      username.textContent = student['first_name'] + ' ' + student['last_name']
      level.textContent = student['level']
      bio.textContent = student['bio']
      skills.innerHTML = ''

      student['skills'].forEach((skill, i) => {
         skill = JSON.parse(skill)

         let [skillLabel] = Object.keys(skill)
         let [skillProgressValue] = Object.values(skill)
         const skillItemElement = `
            <div class="row py-3 skill-item">
               <label class="px-0 " id="skill-item-label">${skillLabel}</label>
               <div class="progress px-0">
                  <div id="progress-bar"class="progress-bar bg-${colors[i]}"  role="progressbar" style="width: ${skillProgressValue}%;"
                     aria-valuenow="${skillProgressValue}" aria-valuemin="0" aria-valuemax="100">${skillProgressValue}%</div>
               </div>
            </div>
         `
         skills.insertAdjacentHTML('beforeend', skillItemElement)
      })
      modalTrigger.click()
   }

}