var express = require('express');
var router = express.Router();
var models = require('../models/index');
var moment = require("moment");

const {
    log
} = require('debug');


router.get('/', function (req, res, next) {
    sess = req.session
    if (sess.username) {
        models.Submission.findAll({
            where: {
                status: 0
            }
        }).then(submissions => {
            res.render('submission', {
                name: sess.name,
                page: 'submission',
                counter: 0,
                submissions: submissions
            })
            res.end();
        }).then(err => console.log(err))
    } else {
        res.redirect('/')
    }
});

router.get('/find/:id', function (req, res, next) {
    sess = req.session
    if (sess.username) {
        models.Submission.findOne({
            where: {
                id: req.params.id
            }
        }).then(submission => {
            models.DetailSubmission.findAll({
                where: {
                    submission_id: submission.id,
                    status: 0
                },
                include: 'major'

            }).then(detailsubmissions => {
                res.render('submission/show', {
                    name: sess.name,
                    page: 'submission-detail',
                    counter: 0,
                    submission: submission,
                    detailsubmissions: detailsubmissions
                })
            }).catch(err => console.log(err));

        }).then(err => console.log(err))
    } else {
        res.redirect('/')
    }
});


router.get('/create', function (req, res, next) {
    sess = req.session
    if (sess.username) {
        models.Major.findAll({
            include: 'category'
        }).then(majors => {
            res.render('submission/create', {
                name: sess.name,
                page: 'submission-create',
                counter: 0,
                majors: majors
            })
            res.end();
        }).catch(err => console.log(err));
    } else {
        res.redirect('/')
    }
});

router.post('/', function (req, res, next) {
    sess = req.session
    if (sess.username) {
        models.Submission.create({
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            company: req.body.company,
            position: req.body.position,
            date: req.body.date,
            status: 0
        }).then(submission => {
            var valid = 0
            for (let index = 0; index < req.body.item.length; index++) {
                valid += 1
                models.DetailSubmission.create({
                    submission_id: submission.id,
                    item_id: req.body.item[index],
                    quantity: req.body.quantity[index],
                    status: 0
                })
                if (valid == req.body.item.length) {
                    res.redirect('/submission')
                }
            }

        }).catch(err => console.log(err));
    } else {
        res.redirect('/')
    }
})



router.put('/itemOut/:id', function (req, res, next) {
    sess = req.session
    if (sess.username) {
        models.DetailSubmission.findOne({
            where: {
                id: req.params.id
            }
        }).then(detailsubmission => {
            models.Major.findOne({
                where: {
                    id: detailsubmission.item_id
                }
            }).then(major => {
                models.Major.update({
                    stok: parseInt(major.stok) - parseInt(detailsubmission.quantity)
                }, {
                    where: {
                        id: major.id
                    }
                })

                models.ItemOutHistory.create({
                    name: req.body.name,
                    item_id: major.id,
                    quantity: detailsubmission.quantity,
                })

                models.DetailSubmission.update({
                    status: 1
                }, {
                    where: {
                        id: detailsubmission.id
                    }
                }).then(detail => {
                    models.DetailSubmission.findAll({
                        where: {
                            submission_id: detailsubmission.submission_id,
                            status: 0
                        }
                    }).then(submission => {
                        if (submission.length > 0) {
                            res.redirect('/submission/find/' + detailsubmission.submission_id)
                        } else {
                            models.Submission.update({
                                status: 1,
                            }, {
                                where: {
                                    id: detailsubmission.submission_id
                                }
                            }).then(() => {
                                res.redirect('/submission')
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    } else {
        res.redirect('/')
    }
});

module.exports = router;