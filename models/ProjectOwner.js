const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectOwnerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    name: {
        type: String
    },
    isIndividual: {
        type: Boolean,
        required: true
    }
});

module.exports = ProjectOwner = mongoose.model('ProjectOwner', ProjectOwnerSchema);