const mongoose = require('mongoose');
const { threadId } = require('worker_threads');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open!");
    })
    .catch(err => {
        console.log("Error!");
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
})

//middleware
//run pre save
personSchema.pre('save', async function () {
    this.first = 'Yo';
    this.last = 'Ho';
    console.log("About to save!");
})
//run post save
personSchema.post('save', async function () {
    console.log("Just saved!");
})

const Person = mongoose.model('Person', personSchema);

// const tammy = new Person({first: 'Tammy', last: 'Chow'});
// tammy.save();

