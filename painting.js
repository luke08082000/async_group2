const { Timestampt } = require('mongodb')
const mongoose = require('mongoose')
const crypto = require('crypto');
const { appendFile } = require('fs');

const paintingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    date_created: {
        type: String,
        required: true
    },
    paint: {
        type: String,
        required: true
    }
}, {versionKey: false}, {timestamps: false})

paintingSchema.pre('save', function() {
    this.paint = crypto.createHash('sha256').update(this.paint).digest('hex');
})

const Painting = mongoose.model('painting', paintingSchema, 'painting')
module.exports = Painting
