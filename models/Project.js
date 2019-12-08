const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
        projectOwner: { type: Schema.Types.ObjectId, ref: 'users' },
        title: {
            type: String,
            required: true
        }
    });

    module.exports = Project = mongoose.model('Project', ProjectSchema);