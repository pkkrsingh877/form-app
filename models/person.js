const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    ID: Number,
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required!"],
        unique: true
    },
    hobbies: [String]
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;