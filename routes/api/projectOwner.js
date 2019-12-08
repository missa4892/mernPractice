const express = require('express');
const router = express.Router();
const passport = require('passport');


const ProjectOwner = require('../../models/ProjectOwner');

// @route GET api/projectOwner/test
// @desc Tests projectOwner route
// @access Public
router.get('/test', (req, res) => res.json({msg: "ProjectOwner Works"}));

// @route GET api/projectOwner
// @desc Get current users projectOwner
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    ProjectOwner.findOne({ user: req.user.id })
        .then(projectOwner => {
            if(!projectOwner){
                errors.noprofile = 'There is no projectOwner for this user';
                return res.status(404).json(errors);
            }
            res.json(projectOwner);
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/projectOwner
// @desc Create/edit users projectOwner
// @access Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        //Get fields
        const projectOwnerFields = {};
        projectOwnerFields.user = req.user.id;
        if(req.body.handle) projectOwnerFields.handle = req.body.handle;
        if(req.body.name) projectOwnerFields.name = req.body.name;
        if(req.body.isIndividual) projectOwnerFields.isIndividual = req.body.isIndividual;
    
        ProjectOwner.findOne({ user: req.user.id })
            .then(projectOwner => {
                if(projectOwner){
                    ProjectOwner.findOneAndUpdate(
                        { user: req.user.id }, 
                        { $set: projectOwnerFields }, 
                        { new: true }
                    )
                    .then(projectOwner => res.json(projectOwner));
                } else {
                    
                    ProjectOwner.findOne({ handle: projectOwnerFields.handle }).then(projectOwner => {
                        if(projectOwner){
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        new ProjectOwner(projectOwnerFields).save().then(projectOwner => res.json(projectOwner));
                    });
                }
            });
});

module.exports = router;