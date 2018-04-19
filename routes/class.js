const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const name = req.body['name'];
    const code = req.body['code'];
    const section = req.body['section'];
    const year = req.body['year'];
    const semester = req.body['semester'];

    if (name && code && section && year && semester) {
        models.class.create({
            name: name,
            code: code,
            section: section,
            year: year,
            semester: semester,
        }).then(classX => {
            if (classX) {
                res.json({
                    status: 1,
                    statusCode: 'class/created',
                    data: classX.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'class/error',
                    description: "Couldn't create the class"
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
            statusCode: 'class/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});
router.get('/:code/:section', async (req, res, next) => {
    const code = req.params.code;
    const section = req.params.section;
    if (code && section) {
        models.class.findOne({
            where: {
                code: code,
                section: section
            }
        }).then(classX => {
            if (classX) {
                res.json({
                    status: 1,
                    statusCode: 'class/found',
                    data: classX.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'class/not-found',
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
            statusCode: 'class/wrong-parameter',
            description: 'The parameters are wrong! :('
        });
    }
});
module.exports = router;
