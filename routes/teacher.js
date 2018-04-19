const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const rut = req.body['rut'];
    const maxGrade = req.body['maxGrade'];
    if (name && email && rut && maxGrade) {
        models.teacher.create({
            name: name,
            email: email,
            rut: rut,
            maxGrade: maxGrade
        }).then(teacher => {
            if (teacher) {
                res.json({
                    status: 1,
                    statusCode: 'teacher/created',
                    data: teacher.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'teacher/error',
                    description: "Couldn't create the teacher"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'teacher/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

router.post('/assign', async (req, res, next) => {
    const rut = req.body.rut;
    const section = req.body.section;
    const code = req.body.code;
    if (rut && section && code) {
        models.teacher.findOne({
            where: {
                rut: rut
            }
        }).then(teacher => {
            if (teacher) {
                models.class.findOne({
                    where: {
                        code: code,
                        section: section
                    }
                }).then(classX => {
                    if (classX) {
                        teacher.addClasses([classX]);
                        res.json({
                            status: 1,
                            statusCode: 'teacher/class-assigned',
                            data: {
                                teacher: teacher.toJSON(),
                                'class': classX.toJSON()
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'student/class-not-found',
                            description: "Couldn't find the class"
                        });
                    }
                }).catch(error => {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'database/error',
                        description: error.toString()
                    });
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'teacher/not-found',
                    description: "Couldn't find the teacher"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'student/wrong-parameter',
            description: 'The parameters are wrong! :('
        });
    }
});

router.get('/:rut', async (req, res, next) => {
    const rut = req.params.rut;
    if (rut) {
        models.teacher.findOne({
            where: {
                rut: rut
            },
            include: [{
                model: models.class,
                through: "TeacherClass",
                as: 'classes',
                include: [{
                    model: models.student,
                    through: "StudentClass",
                    as: 'students'
                }]
            }]
        }).then(teacher => {
            if (teacher) {
                res.json({
                    status: 1,
                    statusCode: 'teacher/found',
                    data: teacher.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'teacher/not-found',
                    description: "Couldn't find the teacher"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'teacher/wrong-parameter',
            description: 'The parameters are wrong! :('
        });
    }
});
module.exports = router;
