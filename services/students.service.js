import { readFile, writeFile } from 'node:fs/promises';

async function getStudents(filter ={}) {
    return readFile('./data/students.json', 'utf8')
        .then(JSON.parse)
        .then(function (students) {
            if (filter.deleted) {
                return students
            } else {
                let studentsFilter = students.filter(element => !element.deleted)
                return studentsFilter
            }        
        }) 
        .catch(function (err) {
            return []
        })
}

async function saveStudents(data) {
    return writeFile('./data/students.json', JSON.stringify(data))
}

async function getStudentByLegajo(legajo) {   
   return getStudents()
        .then(function(students) {
            let student = students.find(element => element.legajo == legajo);
            return student ? student : null 
        }
        )
}

async function createStudent(data) {
    const students = await getStudents();
    const newStudent = {
        legajo: students.length + 1,
        ...data,   
        deleted: false
    }   
    students.push(newStudent)
    await saveStudents(students)
    return newStudent
}

async function deleteStudent(legajo) {
    let deletedStudent = null
    return getStudents()
        .then(function(students) {
            students.map(element => {
                if (element.legajo == legajo) {
                    element.deleted = true;
                    deletedStudent = element;
                }
            })
            if (deleteStudent) {
                saveStudents(students)
            }
            return deletedStudent
        }
    )
}

async function editStudent(legajo, data) {
    const student = await getStudents()
    let editedStudent = null
    for (let i = 0; i < student.length; i++) {
        if (student[i].legajo == legajo) {
            student[i] = {
                legajo: student[i].legajo,
                ...data,
                deleted: student[i].deleted
            }
            editedStudent = student[i]
            break;
        }
    }
    if (editedStudent) {
        await saveStudents(student)
    }
    return editedStudent
}

export {
    getStudents,
    getStudentByLegajo,
    createStudent,
    deleteStudent,
    editStudent,
}