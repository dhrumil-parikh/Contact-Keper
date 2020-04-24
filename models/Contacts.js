const mongoose = require('mongoose');


const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },

    email: {
        type: String
    },
    phone: {
        type: String,
            
    },
    type: {
        type: String,
        default: 'Personal'
    },
    
});

module.exports=mongoose.model('contacts',ContactSchema)