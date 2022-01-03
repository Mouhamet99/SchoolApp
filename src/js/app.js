// import 'regenerator-runtime/runtime' ;
import { addStudent } from './api.js'
window.addEventListener('DOMContentLoaded', function () {
    const REGEX = /apprenants\.html$/;
    if (REGEX.test(window.location.pathname)) {
        return
    }
    const logo = document.querySelector('#logo')
    logo.addEventListener('click', ()=>{
        window.location.href = "../index.html"
    })
    console.log('Home Page');
    let STUDENTS = sessionStorage.getItem('students') ? JSON.parse(sessionStorage.getItem('students')) : [];
    const FORM = document.getElementById('add-form')
    const submitButton = document.querySelector('button[type="submit"]')
    const btnEditForm = document.getElementById('save-edit')
    const lastName = document.getElementById('last-name')
    const firstName = document.getElementById('first-name')
    const bio = document.getElementById('bio')
    const level = document.getElementById('level')
    const file = document.getElementById('profile-img')
    const api = document.getElementById('api')
    const integration = document.getElementById('integration')
    const design = document.getElementById('macquettage')
    const insertStudent = document.querySelector('#saveStudents')
    const cardContainer = document.querySelector('#waiting-student-cards')


    const displayWaitingCards = () => {
        STUDENTS.forEach((student, index) => {
            addCard(student, index)
        });
        if (STUDENTS.length !== 0) {
            insertStudent.classList.remove('d-none')
        }
    }

    const AddTosessionStorage = (student) => {
        STUDENTS.push(student);
        sessionStorage.setItem("students", JSON.stringify(STUDENTS));
    }
    bio.addEventListener("input", (e) => {
        const maxLength = 130;
        let progress = document.querySelector("#text-progress");
        let indicator = document.querySelector("#text-limit");

        submitButton.disabled = false;
        progress.innerText = e.target.value.length;

        if (maxLength - e.target.value.length <= 0) {
            progress.classList.remove("text-warning");
            indicator.classList.add("text-danger");
            submitButton.disabled = true;
        } else if (maxLength - e.target.value.length <= 16) {
            progress.classList.add("text-warning");
            submitButton.disabled = true;
        } else {
            progress.classList.remove("text-warning");
            indicator.classList.remove("text-danger");
        }
    });
    function loadURLToInputFiled(url) {
        getImgURL(url, (imgBlob) => {
            // let fileName = 'hasFilename.jpg'
            // let file = new File([imgBlob], fileName, { type: "image/png", lastModified: new Date().getTime() }, 'utf-8');
            let container = new DataTransfer();
            container.items.add(file.files[0]);
            document.querySelector('#file_input').files = container.files;

        })
    }
    const test = () => {
        var file = document.getElementById('file').files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = document.createElement("img");
            image.src = e.target.result;
            document.body.appendChild(image);
        }
        reader.readAsDataURL(file);
    }
    const formIsValid = () => {
        let lastNameValue = lastName.value.trim()
        let firstNameValue = firstName.value.trim()
        let bioValue = bio.value.trim()
        let levelValue = level.value.trim()
        let inputElements = [bio, lastName, firstName, level]
        let apiPercent = api.value
        let designPercent = design.value
        let integrationPercent = integration.value
        let values = [firstNameValue, lastNameValue, bioValue, levelValue, apiPercent, integrationPercent, designPercent]
        let skills = [api, integration, design]
        let error = document.querySelector('#error')

        file.classList.remove('border-danger')
        inputElements.forEach(element => {
            element.classList.remove('border-danger')
        })
        skills.forEach(skill => {
            skill.classList.remove('border-danger')
        })
        error.classList.add('d-none')

        if (file.files.length == 0 || values.includes("")) {
            error.classList.remove('d-none')

            inputElements.forEach(element => {
                if (element.value.trim() == "") {
                    element.classList.add('border-danger')
                }
            })
            skills.forEach(skill => {
                if (skill.value == "" || typeof parseInt(skill.value) != "number" || parseInt(skill.value) > 100 || parseInt(skill.value) < 0) {
                    skill.classList.add('border-danger')
                }
            })
            file.files[0] ?? file.classList.add('border-danger')

            return false
        }
        // if(skills.some(skill => typeof parseInt(skill.value) != "number" || parseInt(skill.value) > 100 || parseInt(skill.value) < 0)){
        //     skills.forEach(skill => {
        //         if (skill.value == "" || typeof parseInt(skill.value) != "number" || parseInt(skill.value) > 100 || parseInt(skill.value) < 0) {
        //             skill.classList.add('border-danger')
        //         }
        //     })
        //     return false
        // }
        // if (skills.some(skill => typeof parseInt(skill.value) !== "number" || parseInt(skill.value) > 100 || parseInt(skill.value) < 0)) {
        //     skills.forEach(skill => {
        //         if (skill.value == "" || typeof parseInt(skill.value) !== "number" || parseInt(skill.value) > 100 || parseInt(skill.value) < 0) {
        //             skill.classList.add('border-danger')
        //         }
        //     })
        //     return false
        // }
        // Number.isNaN(parseInt(macquettage.value))

        return true
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (formIsValid()) {
            insertStudent.classList.remove('d-none')
            let url = window.URL.createObjectURL(file.files[0])
            const student = {}

            student.first_name = firstName.value
            student.last_name = lastName.value
            student.bio = bio.value
            student.level = level.value
            student.skills = [{ api: api.value }, { design: design.value }, { integration: integration.value }]
            student.image = file.files[0]
            student.url = url
            student.fileName = file.files[0].name


            AddTosessionStorage({ data: student, id: new Date().getTime().toString() })
            addCard({ data: student, id: new Date().getTime().toString() }, STUDENTS.length - 1)

            FORM.reset()
        }

    }
    const removeStudent = (id, index) => {
        STUDENTS.splice(index, 1)
        console.log(index);
        sessionStorage.setItem('students', JSON.stringify(STUDENTS))
        let currentCard = document.getElementById(`${id}`)
        currentCard.remove()
        if(STUDENTS.length == 0){
            insertStudent.classList.add('d-none')
        }
    }
    const addCard = (student, index) => {
        const card = `
        <div class="card p-3 my-2 waiting-student-card" id="${student.id}">
                    <div class="row">
                        <div class="d-flex flex-row align-items-center">
                            <div class="icon  border border-4 border-secondary rounded-circle shadow-sm d-flex">
                                <img class="rounded-circle img-fluid sp-img-cover" id="student-profil" src="${student['data'].url}" alt="student profile image"> 
                            </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0" id="student-fullname" data-last-name="${student['data'].last_name}" data-first-name="${student['data'].first_name}" > ${student['data'].first_name} ${student['data'].last_name}</h6> 
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
                    <div class="row" id="">
                    </div>
                </div>
        `;

        insertStudent.insertAdjacentHTML('beforebegin', card)

        document.getElementById(`edit-student-${student.id}`).addEventListener('click', () => {

            lastName.value = student["data"].last_name
            firstName.value = student["data"].first_name
            bio.value = student["data"].bio
            level.value = student["data"].level
            // file.files[0] = student["data"].image
            // let container = new DataTransfer();
            console.log(student["data"].image);
            // file.items.add(student["data"].image);
            // document.querySelector('#file_input').files = container.files;
            api.value = student["data"]["skills"][0]["api"]
            integration.value = student["data"]["skills"][2]["integration"]
            design.value = student["data"]["skills"][1]["design"]

            submitButton.classList.add('d-none')
            btnEditForm.classList.remove('d-none')
            btnEditForm.setAttribute('data-card-to-update', student.id)
        })
        document.getElementById(`remove-student-${student.id}`).addEventListener('click', () => {
            removeStudent(student.id, index)
        })
    }

    displayWaitingCards()

    submitButton.addEventListener('click', (e) => onSubmitForm(e))

    btnEditForm.addEventListener('click', (e) => {
        e.preventDefault()
        if (formIsValid()) {
            let id = e.target.dataset.cardToUpdate
            let url = window.URL.createObjectURL(file.files[0])
            let currentCard = document.getElementById(`${id}`)
            let ClONE_STUDENTS = [...STUDENTS]
            const student = {}

            currentCard.querySelector('#student-fullname').innerHTML = firstName.value + "  " + lastName.value
            currentCard.querySelector('#student-bio').innerHTML = bio.value
            currentCard.querySelector('#student-level').innerHTML = level.value
            currentCard.querySelector('#student-profil').src = url

            student.first_name = firstName.value
            student.last_name = lastName.value
            student.bio = bio.value
            student.level = level.value
            student.image = file.files[0]
            student.url = url
            student.fileName = file.files[0].name
            student.skills = [{ api: api.value, integration: integration.value, design: design.value }]

            ClONE_STUDENTS.forEach((clone_student, i) => {
                if (clone_student.id === id) {
                    STUDENTS.splice(i, 1, { data: student, id: id })
                }
            })
            sessionStorage.setItem('students', JSON.stringify(STUDENTS))

            submitButton.classList.remove('d-none')
            e.target.classList.add('d-none')
            e.target.setAttribute('data-card-to-update', "")
            FORM.reset()
        }
    })
    insertStudent.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('.center-page').classList.remove('d-none')
        STUDENTS.forEach((newStudent, index) => {
            addStudent(newStudent).then(() => {
                if (STUDENTS.length - 1 == index) {
                    STUDENTS = []
                    sessionStorage.removeItem('students')
                    document.querySelectorAll('.waiting-student-card').forEach(card => card.remove())
                    e.target.classList.add('d-none')
                    document.querySelector('.center-page').classList.add('d-none')
                }
            })
        })

    })
})