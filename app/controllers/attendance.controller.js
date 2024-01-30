const db = require("../models");
const MESSAGE = require("../utils/messages");
const { Op } = require('sequelize');
const Student = db.Student;
const Enrollment = db.Enrollment;
const Class = db.Class;
const Attendance = db.Attendance;
const AttendanceLog = db.AttendanceLog;

const activeCourseId = 3;

const sendError = (res, defaultError, error) => {
    res.status(defaultError.status).send({
        status: defaultError.status,
        message: error?.message || defaultError.message
    })
    return;
}

const requireStudent = async (studentUuid, res) => {
    return Student.findOne({
        where: { uuid: studentUuid }
    })
    .catch(error => {
        sendError(res, { status: 500, message: "Error finding student"}, error);
        return;
    })
}

const requireEnrollment = async (studentId, res) => {
    return Enrollment.findOne({
        where: {
            studentId: studentId,
            courseId: activeCourseId
        }
    })
    .catch(error => {
        sendError(res, { status: 500, message: "Error finding enrollment"}, error);
        return;
    })
}

const requireClass = async (res) => {
    const currentDate = new Date();
    return Class.findOne({
        where: {
            courseId: activeCourseId,
            startTime: {
                [Op.lt]: currentDate,
            },
            endTime: {
                [Op.gt]: currentDate,
            },
        }
    })
    .catch(error => {
        sendError(res, { status: 500, message: "Error finding class"}, error);
        return;
    })
}

const findAttendance = async (res, studentId, classId) => {
    return Attendance.findOne({
        where: {
            studentId: studentId,
            classId, classId
        }
    })
    .catch(error => {
        sendError(res, { status: 500, message: "Error finding attendance"}, error);
        return;
    })
}

const updateAttendance = async (res, newAttendance) => {
    return Attendance.update(newAttendance, {
        where: {
            studentId: newAttendance.studentId,
            classId: newAttendance.classId
        }
    })
    .catch(error => {
        sendError(res, { status: 500, message: "Error updating attendance"}, error);
        return;
    })
}

const createAttendance = async (res, newAttendance) => {
    return Attendance.create(newAttendance)
    .catch(error => {
        sendError(res, { status: 500, message: "Error creating attendance"}, error);
        return;
    })
}

const getAction = (attended, isNew) => {
    if (isNew) {
        return "NEW ATTENDANCE";
    }
    if (attended) {
        return "ENTER";
    }
    if (!attended) {
        return "EXIT";
    }
    return "UNKNOWN ACTION";
}

const logAttendance = async (res, studentId, classId, attended, isNew) => {
    action = getAction(attended, isNew);
    return AttendanceLog.create({
        action: action,
        studentId: studentId,
        classId: classId,
    })
    .catch(error => {
        sendError(res, { status: 500, message: "failed to log" }, error);
        return;
    })
}

exports.newEntry = async (req, res) => {
    // fail if no student id present
    const studentUuid = req.params.studentUuid;
    if (!studentUuid) {
        const error = MESSAGE.BAD_REQUEST;
        res.status(error.status).send({
            message: error.message
        })
        return;
    }

    console.log("request found");

    // fail if student does not exist
    const student = await requireStudent(studentUuid, res);
    if (!student) {
        sendError(res, { status: 404, message: "Could not find the student"}, undefined);
        return;
    }

    console.log("student found");

    // fail if student is not enrolled
    const enrollment = await requireEnrollment(student.id, res);
    if (!enrollment) {
        sendError(res, { status: 400, message: "Student did not enroll into active course"}, undefined);
        return;
    }

    console.log("enrollment found");

    // fail if no class present
    const currentClass = await requireClass(res);
    if (!currentClass) {
        sendError(res, { status: 404, message: "There is no active class"}, undefined);
        return;
    }

    console.log("class found");

    const username = student.lastname + " " + student.name;

    // check if student already swipped
    const attendance = await findAttendance(res, student.id, currentClass.id);
    if (attendance?.studentId && attendance?.classId) {
        console.log("attendance found");
        const newAttendance = {
            studentId: attendance.studentId,
            classId: attendance.classId,
            attended: !attendance.attended
        }
        const responseAttendance = await updateAttendance(res, newAttendance);
        if (!responseAttendance) {
            return;
        }
        console.log("attendance updated");
        const responseLog = await logAttendance(res, newAttendance.studentId, newAttendance.classId, newAttendance.attended);
        console.log("attendance logged");
        if (!responseLog) {
            return;
        }
        res.status(200).send({
            status: 200,
            user: username,
            message: newAttendance.attended ? "ENTER" : "EXIT"
        })
        return;
    }

    // create new attendance if didnt swipe
    console.log("attendance NOT found");
    const newAttendance = {
        studentId: student.id,
        classId: currentClass.id,
        attended: true
    }
    const responseAttendance = await createAttendance(res, newAttendance);
    if (!responseAttendance) {
        return;
    }
    console.log("new attendance created");
    const responseLog = await logAttendance(res, newAttendance.studentId, newAttendance.classId, newAttendance.attended);
    if (!responseLog) {
        return;
    }
    console.log("new attendance logged");
    res.status(200).send({
        status: 200,
        user, username,
        message: "ENTER"
    });
    
    console.log("END");
    return;
}

exports.test = (req, res) => {
    res.send({
        message: "Testing default attendance POST route"
    })
}
