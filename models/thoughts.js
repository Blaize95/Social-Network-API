const { Schema, model, Types } = require('mongoose');
const moment = require('moment')


const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: function() { return new Types.ObjectId() }
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    username: {
        type: String,
        required: true,
    },
    createdaAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDate) => moment(createdAtDate).format('DD MMMM YYYY, h:mm a')
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
})

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDate) => moment(createdAtDate).format('DD MMMM YYYY, h:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;