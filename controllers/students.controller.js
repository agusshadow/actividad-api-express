import * as service from '../services/students.service.js'

function getStudents(req, res) {
    service.getStudents({deleted: true})
        .then(students => res.status(200).json(students))
}

function getStudentByLegajo(req, res) {
    let { legajo } = req.params;
    service.getStudentByLegajo(legajo)
        .then(function(student) {
            student ? res.status(200).json(student) : res.status(404).json({error: {message: `Could not find student with id ${legajo}`}})
        })
}

function createStudent(req, res) {
    service.createStudent(req.body)
    .then(student => res.status(200).json(student))
}

function deleteStudent(req, res) {
    let { legajo } = req.params;
    service.deleteStudent(legajo)
        .then(function(student) {
            student ? res.status(200).json(student) : res.status(404).json({error: {message: `Could not find student with id ${legajo}`}})
        })
}   

async function editStudent(req, res) {
    let { legajo } = req.params;
    service.editStudent(legajo, req.body)
        .then(function(student) {
            student ? res.status(200).json(student) : res.status(404).json({error: {message: `Could not find student with id ${legajo}`}})
        })
}


export {
    getStudents,
    getStudentByLegajo,
    createStudent,
    deleteStudent,
    editStudent,
}