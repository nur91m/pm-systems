const express = require("express");
const router = express.Router();
const passport = require("passport");
const Roles = require("../../models/Roles");
const jwt_decode = require("jwt-decode");

//Load models
const WeeklyReport = require("../../models/WeeklyReport");
const CustomReport = require("../../models/CustomReport");
const Project = require("../../models/Project");
const User = require("../../models/User");

//  @route  POST /api/reports/weekly-report/last
//  @desc   GET last weekly report. Request should contain userId and projectId
//  @access Private
router.post(
  "/weekly-report/last",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const discipline = req.body.discipline;
    // Get latest weekly report by projectId
    WeeklyReport.find({ project: req.body.projectNumber, discipline })
      .sort({ date: -1 })
      .limit(1)
      .then(report => {
        if (report.length != 0) {
          return res.status(200).json(report[0]);
        } else {
          return res.status(200).json(report);
        }
      })
      .catch(err => console.log(err));
  }
);

//  @route  POST /api/reports/weekly-report/by-date
//  @desc   GET last weekly report. Request should contain userId and projectId
//  @access Private
router.post(
  "/weekly-report/by-date",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let groupedReport = {};
    // Get all weekly reports by project order number
    WeeklyReport.find({ project: req.body.projectNumber })
      .then(reports => {
        reports.forEach(report => {
          let date = new Date(report.date);
          console.log(date);

          date = `${date.getDate()}-${date.getMonth() +
            1}-${date.getFullYear()}`;

          // Check if date has been added
          if (date in groupedReport) {
            // Check if discipline has not been added yet
            if (!(report.discipline in groupedReport[date])) {
              const data = { [report.discipline]: [report] };
              groupedReport[date] = { ...groupedReport[date], ...data };
            } else {
              groupedReport[date][report.discipline].push(report);
            }
          } else {
            const data = { [date]: { [report.discipline]: [report] } };
            groupedReport = { ...groupedReport, ...data };
          }
        });

        return res.status(200).json(groupedReport);
      })
      .catch(err => console.log(err));
  }
);

//  @route  POST /api/reports/weekly-report
//  @desc   Create weekly report
//  @access Private
router.post(
  "/weekly-report",
  passport.authenticate("jwt", { session: false }),
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
      .then(report => {
        return res.status(200).json(report);
      })
      .catch(error => res.status(400).json(error));
  }
);

//  @route  POST /api/reports/weekly-report/edit/:reportId
//  @desc   Edit weekly report by id
//  @access Private
router.post(
  "/weekly-report/edit/:reportId",
  passport.authenticate("jwt", { session: false }),
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
          return res
            .status(400)
            .json({ msg: "Coud not update report", error: err });
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
  "/custom-report",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const reportFileds = {};
    reportFileds.user = req.body.user;
    reportFileds.discipline = req.body.discipline;
    reportFileds.date = new Date(req.body.date);
    reportFileds.projects = req.body.projects;

    User.findById(req.body.user).then(user => {
      if (user.role != Roles.Employee) {
        reportFileds.needsVerification = false;
      }
    });

    new CustomReport(reportFileds)
      .save()
      .then(report => res.status(200).json(report))
      .catch(error => res.status(400).json(error));
  }
);

//  @route  POST /api/reports/custom-report/last
//  @desc   Get custom report created in this month
//  @access Private
router.post(
  "/custom-report/last",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = jwt_decode(req.headers.authorization);
    CustomReport.find({ user: user.id })
      .sort({ date: -1 })
      .limit(1)
      .then(report => {
        if (report) {
          const month = report[0].date.getMonth();
          report = month == new Date().getMonth() ? report[0] : {report: 'Пусто'};
          res.status(200).json(report);
        }
      })
      .catch(err => console.log(err));

    // reportFileds.tasks = req.body.tasks;

    // new CustomReport(reportFileds)
    //   .save()
    //   .then(report => res.status(200).json(report))
    //   .catch(error => res.status(400).json(error));
  }
);

//  @route  POST /api/reports/weekly-report/edit/:reportId
//  @desc   Edit weekly report by id
//  @access Private
router.post(
  "/custom-report/edit/:reportId",
  passport.authenticate("jwt", { session: false }),
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
          return res
            .status(400)
            .json({ msg: "Coud not update report", error: err });
        }
        res.status(200).json(data);
      }
    );
  }
);

module.exports = router;
