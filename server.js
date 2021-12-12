const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Person = require('./models/person');
const prepareHobbies = require('./functions/prepareHobbies');
const errorHandler = require('./functions/errorHandler');
const methodOverride = require('method-override');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// setting up mongoose and mongo

try{
    mongoose.connect('mongodb://localhost:27017/formapp');
    console.log('DB CONNECTION SUCCESSFUL!');
}catch(err){
    console.log(err);
    console.log('DB CONNECTION FAILED!');
}

app.delete('/api/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Person.findByIdAndDelete(id);
        res.status(200).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).send('Could not delete the data');
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, phoneNumber, email, hobbies } = req.body;
        let count = await Person.countDocuments();
        count++;
        const person = await Person.create({
            name: name,
            ID: count,
            phoneNumber: phoneNumber,
            email: email,
            hobbies: prepareHobbies(hobbies)
        });
        console.log(person);
        res.status(200).json({ person });
    } catch (err) {
        const error = errorHandler(err);
        console.log(error, err);
        res.status(400).json({ error });
    }
});

app.get('/', async (req, res) => {
    const people = await Person.find({});
    console.log(people);
    res.render('index.ejs', { people });
});

app.listen(port, () => {
    console.log('Server is running at port 3000');
});