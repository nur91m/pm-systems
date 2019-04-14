const express = require('express');
const router = express.Router();
const passport = require('passport');
const Roles = require('../../models/Roles');

//Load models
const WeeklyReport = require('../../models/WeeklyReport');
const CustomReport = require('../../models/CustomReport');
const Project = require('../../models/Project');
const User = require('../../models/User');

//  @route  GET /api/reports/weekly-report
//  @desc   GET last weekly report. Request should contain userId and projectId
//  @access Private
router.get(
  '/weekly-report',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Find which discipline is user from
    User.findById(req.body.user)
      .then(user => {
        const discipline = user.discipline;        
        // Get latest weekly report by projectId
        WeeklyReport.find({ project: req.body.projectId, discipline})
           .sort({ date: -1 })
           .limit(1)
          .then(report => {            
            return res.json(report);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

//  @route  POST /api/reports/weekly-report
//  @desc   Create weekly report
//  @access Private
router.post(
  '/weekly-report',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reportFileds = {};
    reportFileds.project = req.body.project;
    reportFileds.user = req.body.user;
    reportFileds.discipline = req.body.discipline;
    reportFileds.date = new Date(req.body.date);

    User.findById(req.body.user).then(user => {
      if (user.role != Roles.Employee) {
        reportFileds.needsVerification = false;
      }
    });

    reportFileds.tasks = req.body.tasks;

    new WeeklyReport(reportFileds)
      .save()
      .then(report => res.json(report))
      .catch(error => res.json(error));
  }
);

//  @route  POST /api/reports/weekly-report/edit/:reportId
//  @desc   Edit weekly report by id
//  @access Private
router.post(
  '/weekly-report/edit/:reportId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reportFileds = {};
    reportFileds.project = req.body.project;
    reportFileds.user = req.body.user;
    reportFileds.discipline = req.body.discipline;
    reportFileds.date = new Date(req.body.date);

    User.findById(req.body.user).then(user => {
      if (user.role != Roles.Employee) {
        reportFileds.needsVerification = false;
      }
    });

    reportFileds.tasks = req.body.tasks;

    WeeklyReport.findByIdAndUpdate(
      req.params.reportId,
      { ...reportFileds },
      { new: true },
      (err, data) => {
        if (err) {
          return res.json({ msg: 'Coud not update report', error: err });
        }
        res.json(data);
      }
    );
  }
);

//  @route  POST /api/reports/custom-report
//  @desc   Create custom report
//  @access Private
router.post(
  '/custom-report',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reportFileds = {};
    reportFileds.project = req.body.project;
    reportFileds.user = req.body.user;
    reportFileds.discipline = req.body.discipline;

    reportFileds.date = new Date(req.body.date);

    User.findById(req.body.user).then(user => {
      if (user.role != Roles.Employee) {
        reportFileds.needsVerification = false;
      }
    });

    reportFileds.tasks = req.body.tasks;

    new CustomReport(reportFileds)
      .save()
      .then(report => res.json(report))
      .catch(error => res.json(error));
  }
);

//  @route  POST /api/reports/weekly-report/edit/:reportId
//  @desc   Edit weekly report by id
//  @access Private
router.post(
  '/custom-report/edit/:reportId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const reportFileds = {};
    reportFileds.project = req.body.project;
    reportFileds.user = req.body.user;
    reportFileds.discipline = req.body.discipline;
    reportFileds.date = new Date(req.body.date);

    User.findById(req.body.user).then(user => {
      if (user.role != Roles.Employee) {
        reportFileds.needsVerification = false;
      }
    });

    reportFileds.tasks = req.body.tasks;

    WeeklyReport.findByIdAndUpdate(
      req.params.reportId,
      { ...reportFileds },
      { new: true },
      (err, data) => {
        if (err) {
          return res.json({ msg: 'Coud not update report', error: err });
        }
        res.json(data);
      }
    );
  }
);

module.exports = router;
