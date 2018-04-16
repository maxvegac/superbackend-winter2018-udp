const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const rut = req.body['rut'];
    const startYear = req.body['startYear'];
    const ranking = req.body['ranking'];
    const schoolRanking = req.body['schoolRanking'];

    if (name && email && rut && startYear && ranking && schoolRanking) {
        models.student.create({
            name: name,
            email: email,
            rut: rut,
            startYear: startYear,
            ranking: ranking,
            schoolRanking: schoolRanking
        }).then(student => {
            if (student) {
                res.json({
                    status: 1,
                    statusCode: 'student/created',
                    data: student.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'student/error',
                    description: "Couldn't create the student"
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
            statusCode: 'student/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

router.post('/assign', async (req, res, next) => {
    const rut = req.body.rut;
    const section = req.body.section;
    const code = req.body.code;
    if (rut && section && code) {
        models.student.findOne({
            where: {
                rut: rut
            }
        }).then(student => {
            if (student) {
                models.class.findOne({
                    where: {
                        code: code,
                        section: section
                    }
                }).then(classX => {
                    if (classX) {
                        student.addClass(classX);
                        res.json({
                            status: 1,
                            statusCode: 'student/class-asigned',
                            data: {
                                student: student.toJSON(),
                                'class': classX.toJSON()
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'student/class-not-found',
                            description: "Couldn't find the student"
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
                    statusCode: 'student/not-found',
                    description: "Couldn't find the student"
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
        models.student.findOne({
            where: {
                rut: rut
            }
        }).then(student => {
            if (student) {
                res.json({
                    status: 1,
                    statusCode: 'student/found',
                    data: student.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'student/not-found',
                    description: "Couldn't find the student"
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
module.exports = router;
