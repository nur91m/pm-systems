const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const projectInputValidator = require('../../validation/project');

// Load models
const User = require('../../models/User');
const Project = require('../../models/Project');

//  @route  POST /api/projects
//  @desc   Create project
//  @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = projectInputValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Project.findOne({ orderNumber: req.body.orderNumber })
      .then(project => {
        // Check if proeject exists
        if (project) {
          errors.project = 'Project already exists with this order number';
          return res.status(404).json(errors);
        }

        const projectFields = {};
        projectFields.name = req.body.name;
        projectFields.orderNumber = req.body.orderNumber;
        projectFields.disciplines = req.body.disciplines.split(',');

        // Save Project
        new Project(projectFields).save().then(project => res.json(project));
      })
      .catch(error =>
        res
          .status(404)
          .json({ project: 'There is no project with this number' })
      );
  }
);

//  @route  POST /api/projects/edit/:projectId
//  @desc   Edit project
//  @access Private
router.post(
  '/edit/:projectId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = projectInputValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const projectFields = {};
    projectFields.name = req.body.name;
    projectFields.orderNumber = req.body.orderNumber;
    projectFields.disciplines = req.body.disciplines.split(',');

    Project.findByIdAndUpdate(
      req.params.projectId,
      { ...projectFields },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ project: 'Could not update project' });
        }
        if (!data) {
          return res.status(400).json({ project: 'Could not find project' });
        }
        res.json(data);
      }
    );
  }
);

//  @route  GET /api/projects/order-number/:orderNumber
//  @desc   Get project by order number
//  @access Public
router.get('/order-number/:orderNumber', (req, res) => {
  const errors = {};

  Project.findOne({ orderNumber: req.params.orderNumber })
    .then(project => {
      if (!project) {
        errors.noproject = 'There are no projects';
        return res.status(404).json(errors);
      }
      res.json(project);
    })
    .catch(error =>
      res.status(404).json({ project: 'There is no project with this number' })
    );
});

//  @route  GET /api/projects/:projectId
//  @desc   Get project by project Id
//  @access Public
router.get('/:projectId', (req, res) => {
    const errors = {};
  
    Project.findOne({ projectId: req.params.projectId })
      .then(project => {
        if (!project) {
          errors.noproject = 'There are no projects';
          return res.status(404).json(errors);
        }
        res.json(project);
      })
      .catch(error =>
        res.status(404).json({ project: 'There is no project with this number' })
      );
  });

module.exports = router;
