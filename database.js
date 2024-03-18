const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aybajulaye007:gjstNEvAUYtiLSm@<cluster-url>?retryWrites=true&writeConcern=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn?.db("gomycode");



// MONGOOSE SCHEMA FOR THE PERSON MODEL WITH NAME, AGE AND FAVOURITE FOODS AS REQUIRED FIELDS

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

// I CREATED A NEW PERSON DOCUMENT AND SAVED IT TO THE DB

const person = new Person({
    name: 'Baj',
    age: 99,
    favoriteFoods: ['amala', 'fufu']
});

person.save((err, data) => {
    if (err) return console.error(err);
    console.log('Person saved:', data);
});

// MULTIPLE RECORDS WITH THE MODEL.CREATE() 

const arrayOfPeople = [
    { name: 'isaac', age: 33, favoriteFoods: ['eggs', 'bacon'] },
    { name: 'jordan', age: 78, favoriteFoods: ['chicken', 'chips'] }
];

Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
});

// I AM USING THE FIND() TO GET A PARTICULAR NAME

Person.find({ name: 'baj' }, (err, people) => {
    if (err) return console.error(err);
    console.log('People found:', people);
});

// I AM USING THE FINDONE() TO GET A PARTICULAR NAME

Person.findOne({ favoriteFoods: 'amala' }, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found:', person);
});


// I AM USING THE FINDBYID() TO FIND A PERSON BY ID

const personId = '5th6867guf976';
Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found by Id:', person);
});

// I AM FINDING A PERSON BY ID AND UPDATING THE FAVOURITE MEAL

Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Updated person:', updatedPerson);
    });
});

// I AM FINDING A PERSON BY NAME (baj) AND UPDATING THE AGE

const personName = 'baj';
Person.findOneAndUpdate({ name: personName }, { age: 66 }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log('Updated person:', updatedPerson);
});

// I DELETED A DOCUMENT USING AN ID

Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log('Removed person:', removedPerson);
});

// I DELETED MULTIPLE DOCUMENT

Person.remove({ name: 'isaac' }, (err, result) => {
    if (err) return console.error(err);
    console.log('Deleted people:', result);
});

// I CHAIN SEARCHED WITH QUERY HELPERS FOLLOWING THE GUIDELINES ON THE PLATFORM

Person.find({ favoriteFoods: 'amala' })
    .sort({ name: 2 })
    .limit(2)
    .select({ age: 45 })
    .exec((err, data) => {
        if (err) return console.error(err);
        console.log('amala lovers:', data);
    });


export default db;

