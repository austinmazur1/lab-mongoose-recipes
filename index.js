const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//connected to my mongodb
const MONGODB_URI = 'mongodb+srv://mazuraustin1:gDytBJKVd6Vrf2c8@cluster32.wvkdomp.mongodb.net/test';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //use this to create new recipe, passing the data from seperate file
    Recipe.create(data[0])
    // console.log(data[0].title);
    return Recipe.insertMany(data)

})
.then(() => { 
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(console.log('success'))
  // query search {duration: {$eq:100}} to check
})

.then(() => {
  Recipe.deleteOne({title: "Carrot Cake"})
  .then(console.log('succesful deletion!'))
  
})
// return mongoose.connection.close();
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

