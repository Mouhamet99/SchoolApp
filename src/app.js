window.onload = function () {
    const STUDENTS = [
        [{
            data: {
                first_name: "Maman",
                bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quo eum ea exercitationem ex. Eaque at eum saepe? Odit, sunt.",
                last_name: "DIOP",
                skills: ['{"frontend":50}', '{"backend":80}', '{"API":80}'],
                level: "debutant",
                created_at: {
                    seconds: 1640260381,
                    nanoseconds: 698000000,
                },
            },
            id: "RNteYV3uOo44cTUARnTK",
        },
        {
            data: {
                level: "intermediare",
                bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quo eum ea exercitationem ex. Eaque at eum saepe? Odit, sunt.",
                skills: ['{"frontend":50}', '{"backend":90}', '{"Desingn":30}'],
                last_name: "Ndiaye",
                created_at: {
                    seconds: 1640265000,
                    nanoseconds: 0,
                },
                first_name: "Momo",
            },
            id: "Xu8VulaaZLjlvAxbtA9p",
        },
        ],
    ];

    const onSubmitForm = (e) => {
        e.preventDefault();
        const addForm = document.getElementById('add-form')
        const lastName = document.getElementById('last-name')
        const firstName = document.getElementById('first-name')
        const bio = document.getElementById('bio')
        const level = document.getElementById('level')
        const student = {}

        student.first_name = firstName.value
        student.last_name = lastName.value
        student.bio = bio.value
        student.level = level.value
        addCard(student)
        addForm.reset()
    }
    const addCard = (student)=>{
        const cardContainer = document.querySelector('#waiting-student-cards')
        const saveButton = document.querySelector('#saveStudents')
        const card = `
        <div class="card p-3 my-2 waiting-student-card" >
                    <div class="row">
                        <div class="d-flex flex-row align-items-center">
                            <!-- <div class="icon"> <i class="fa fa-twitter"></i> </div> -->
                            <div class="icon"> <img class="rounded-circle img-fluid"src="https://via.placeholder.com/100" alt="student profile image" > </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0">${student.first_name} ${student.last_name}</h6> 
                                <strong>${student.level}</strong>
                            </div>
                            <div class="d-inline ms-auto align-self-start">
                                <a class="border-0 btn-transition btn btn-outline-success save_student"
                                    title="marquer comme terminée la tâche"><i class="fa fa-check"></i>
                                </a>
                                <a class="border-0 btn-transition btn btn-outline-warning edit_student"
                                    title="modifier tache"><i class="fa fa-edit"></i>
                                </a>
                                <a class="border-0 btn-transition btn btn-outline-danger remove_student"
                                    title="supprimer tache"><i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mt-3">
                            <span class="text-muted">${student.bio}</span>
                        </div>
                    </div>
                </div>
        `
        saveButton.insertAdjacentHTML('beforebegin', card)
    }
    const submitButton = document.querySelector('button[type="submit"]')
    submitButton.addEventListener('click', onSubmitForm)
};