const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
        projectOwner: { type: Schema.Types.ObjectId, ref: 'ProjectOwner' },
        title: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        projectType: {
            type: String,
            required: true
        },
        frequency: {
            type: String
        },
        location: {
            type: String
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        ongoing: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }, 
        status: {
            type: String,
            required: true
        },
        issuesAddressed: {
            type: [String]
        },
        volunteers: {
            volunteerDetails: {
                requiredCount: {
                    type: Number
                },
                role: {
                    type: String
                },
                duration: {
                    type: String
                }
            },
            benefitForVolunteer: {
                type: String
            },
            volunteerSignUpLink: {
                type: String
            }
        }
    });

    module.exports = Project = mongoose.model('project', ProjectSchema);