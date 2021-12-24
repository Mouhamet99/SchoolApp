import { uploadFiles } from './api.js'
window.onload = function () {
    // const studentRef = {
    //     data: {
    //         first_name: "Maman",
    //         bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quo eum ea exercitationem ex. Eaque at eum saepe? Odit, sunt.",
    //         last_name: "DIOP",
    //         skills: ['{"frontend":50}', '{"backend":80}', '{"API":80}'],
    //         level: "debutant",
    //         created_at: {
    //             seconds: 1640260381,
    //             nanoseconds: 698000000,
    //         },
    //     },
    //     id: "RNteYV3u44cTUARnTK",
    // };
    const STUDENTS = sessionStorage.getItem('students') ? JSON.parse(sessionStorage.getItem('students')) : [];

    const addForm = document.getElementById('add-form')
    const lastName = document.getElementById('last-name')
    const firstName = document.getElementById('first-name')
    const bio = document.getElementById('bio')
    const level = document.getElementById('level')
    const btnFormSubmit = document.getElementById('btn-submit')
    const cardContainer = document.querySelector('#waiting-student-cards')


    const displayWaitingCards = () => {
        STUDENTS.forEach((student, index) => {
            console.log(student);
            addCard(student, index)
        });
    }
    const AddTosessionStorage = (student) => {
        STUDENTS.push(student);
        sessionStorage.setItem("students", JSON.stringify(STUDENTS));
        console.log(sessionStorage.getItem("students"));
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        let file = document.getElementById('profile-img')
        uploadFiles(file.files[0])
        const student = {}

        student.first_name = firstName.value
        student.last_name = lastName.value
        student.bio = bio.value
        student.level = level.value

        // let url = window.URL.createObjectURL(file.files[0])
        // student.created_at = Timestamp.fromDate(new Date())
        // student.skills =  ['{"frontend":50}', '{"backend":90}', '{"Desingn":30}']
        AddTosessionStorage({ data: student, id: Math.random().toString() })
        addCard({ data: student, id: Math.random().toString() }, STUDENTS.length)

        addForm.reset()
    }

    const UpdatedCard = (oldstudent, newstudent) => {

    }
    const removeStudent = (id, index) => {
        STUDENTS.splice(index, 1)
        sessionStorage.setItem('students', JSON.stringify(STUDENTS))
        let currentCard = document.getElementById(`${id}`)
        currentCard.remove()
    }
    const addCard = (student, index) => {
        const saveButton = document.querySelector('#saveStudents')
        const card = `
        <div class="card p-3 my-2 waiting-student-card" id="${student.id}">
                    <div class="row">
                        <div class="d-flex flex-row align-items-center">
                            <!-- <div class="icon"> <i class="fa fa-twitter"></i> </div> -->
                            <div class="icon"> <img class="rounded-circle img-fluid"src="https://via.placeholder.com/100" alt="student profile image" > </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0" id="student-fullname" data-laste-name="${student['data'].laste_name}" data-first-name="${student['data'].first_name}" >${student['data'].first_name} ${student['data'].last_name}</h6> 
                                <strong id="student-level">${student['data'].level}</strong>
                            </div>
                            <div class="d-inline ms-auto align-self-start">
                                <a class="border-0 btn-transition btn btn-outline-warning edit_student" id="edit-student-${student.id}"
                                    title="modifier etudiant  de la liste d'attente"><i class="fa fa-edit"></i>
                                </a>
                                <a class="border-0 btn-transition btn btn-outline-danger remove_student" id="remove-student-${student.id}" data-card-remove="${student.id}"
                                    title="supprimer etudiant de la liste d'attente"><i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mt-3">
                            <span class="text-muted" id="student-bio">${student['data'].bio}</span>
                        </div>
                    </div>
                </div>
        `;

        saveButton.insertAdjacentHTML('beforebegin', card)

        document.getElementById(`edit-student-${student.id}`).addEventListener('click', () => {

            lastName.value = student["data"].last_name
            firstName.value = student["data"].first_name
            bio.value = student["data"].bio
            level.value = student["data"].level
            // levelOption.selected = true

            btnFormSubmit.classList.add('d-none')
            btnFormEdit.classList.remove('d-none')
            btnFormEdit.setAttribute('data-card-to-update', student.id)
        })
        document.getElementById(`remove-student-${student.id}`).addEventListener('click', () => {
            removeStudent(student.id, index)
        })
    }

    displayWaitingCards()
    const submitButton = document.querySelector('button[type="submit"]')
    const btnFormEdit = document.getElementById('save-edit')

    submitButton.addEventListener('click', onSubmitForm)

    btnFormEdit.addEventListener('click', (e) => {
        e.preventDefault()

        let id = e.target.dataset.cardToUpdate
        let currentCard = document.getElementById(`${id}`)
        const student = {}

        currentCard.querySelector('#student-fullname').innerHTML = firstName.value + "  " + lastName.value
        currentCard.querySelector('#student-bio').innerHTML = bio.value
        currentCard.querySelector('#student-level').innerHTML = level.value

        student.first_name = firstName.value
        student.last_name = lastName.value
        student.bio = bio.value
        student.level = level.value
        // AddTosessionStorage({ data: student, id: Math.random().toString() })

        addForm.reset()
    })




};