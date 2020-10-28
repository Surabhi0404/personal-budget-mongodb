const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    value: {
        type: Number,
        trim: true,
        required: true,
    },
    color: {
        type: String,
        minlength: 6,
        validate: [colorValidator, 'not a valid color'],
        required: true
        
    }
}, {collection: 'budget'})

function colorValidator (v) {
    if (v.indexOf('#') == 0) {
        if (v.length == 7) {  // #f0f0f0
            return true;
        }
    }
    return COLORS.indexOf(v) > -1;
};

module.exports = mongoose.model('budget', budgetSchema)