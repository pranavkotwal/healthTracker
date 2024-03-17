const mongoose = require('mongoose');

const medicalDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    reports: [{
        name: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

medicalDataSchema.index({ user: 1, date: -1 }); // Index for efficient querying

const MedicalData = mongoose.model('MedicalData', medicalDataSchema);

module.exports = MedicalData;
