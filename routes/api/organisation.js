const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


const organisation = require('../../models/Organisation');

const User = require('../../models/User');

// @route GET api/organisation/test
// @desc Tests organisation route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Organisation Works"}));

// @route GET api/organisation
// @desc Get current users organisation
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    organisation.findOne({ user: req.user.id })
        .then(organisation => {
            if(!organisation){
                errors.noprofile = 'There is no organisation for this user';
                return res.status(404).json(errors);
            }
            res.json(organisation);
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/organisation
// @desc Create/edit users organisation
// @access Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        //Get fields
        const organisationFields = {};
        organisationFields.user = req.user.id;
        if(req.body.handle) organisationFields.handle = req.body.handle;
        if(req.body.location) organisationFields.location = req.body.location;
        if(req.body.organisationName) organisationFields.organisationName = req.body.organisationName;
        if(req.body.website) organisationFields.website = req.body.website;
        if(req.body.status) organisationFields.status = req.body.status;
        if(req.body.isIndividual) organisationFields.isIndividual = req.body.isIndividual;
        if(req.body.categories) organisationFields.categories = req.body.categories;
        if(req.body.bio) organisationFields.bio = req.body.bio;
        if(req.body.description) organisationFields.description = req.body.description;
        if(req.body.dateCreated) organisationFields.dateCreated = req.body.dateCreated;
        if(typeof req.body.projects !== 'undefined'){
            organisationFields.projects = req.body.projects.split(',');
        }
        organisationFields.social = {};

        if(req.body.youtube) organisationFields.social.youtube = req.body.youtube;
        if(req.body.twitter) organisationFields.social.twitter = req.body.twitter;
        if(req.body.facebook) organisationFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) organisationFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) organisationFields.social.instagram = req.body.instagram;
    
        organisation.findOne({ user: req.user.id })
            .then(organisation => {
                if(organisation){
                    organisation.findOneAndUpdate(
                        { user: req.user.id }, 
                        { $set: organisationFields }, 
                        { new: true }
                    )
                    .then(organisation => res.json(organisation));
                } else {
                    
                    organisation.findOne({ handle: organisationFields.handle }).then(organisation => {
                        if(organisation){
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                        new Organisation(organisationFields).save().then(organisation => res.json(organisation));
                    });
                }
            });
});

module.exports = router;