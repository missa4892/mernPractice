const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../../models/Project');

// @route GET api/projects/test
// @desc Tests projects route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Projects Works"}));

// @route GET api/projects
// @desc Get all projects
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Project.find({})
        .then(projects => {
            if(!projects){
                errors.noprofile = 'There are no projects';
                return res.status(404).json(errors);
            }
            res.json(projects);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/projects
// @desc Get current users project
// @access Private
router.get('/my', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Project.find({ projectOwner: req.user.id })
        .populate('projectOwner')
        .exec(function(err, projects){
            console.log(err);
            res.json(projects);
        });
        // .then(projects => {
        //     if(!projects){
        //         errors.noprofile = 'There is no project for this user';
        //         return res.status(404).json(errors);
        //     }
        //     res.json(projects);
        // })
        // .catch(err => res.status(404).json(err));
});

// @route POST api/projects
// @desc Create/edit users projects
// @access Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        //Get fields
        const projectFields = {};
        projectFields.projectOwner = req.user._id;
        if(req.body.title) projectFields.title = req.body.title;
    
        // Project.findOne({ user: req.user.id })
        //     .then(project => {
        //         if(project){
        //             Project.findOneAndUpdate(
        //                 { user: req.user.id }, 
        //                 { $set: projectFields }, 
        //                 { new: true }
        //             )
        //             .then(project => res.json(project));
        //         } else {
                        new Project(projectFields).save().then(project => res.json(project));
            //     }
            // });
});


module.exports = router;