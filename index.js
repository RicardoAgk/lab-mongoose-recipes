const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const promise1 = Recipe.create({
  title: 'Açorda',
  level: 'Easy Peasy',
  ingredients: ['bread', 'olive oil', 'garlic', 'salt', 'cilantro'],
  cuisine: 'Portuguese',
  dishType: 'main_course',
  duration: 30,
  creator: `Alentejo's people`,
}).then((response) => {
  console.log(`A new recipe was added. ${response}`)
});

const promise2 = Recipe.insertMany(data);

const promise3 = Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}).then((response) => {
  console.log(`A recipe was updated. ${response}`);
})

const promise4 = Recipe.remove({title: 'Carrot Cake'}).then((response) => {
  console.log(`A recipe was removed: ${response}`)
})



Promise.all([promise1, promise2, promise3, promise4]).then(()=>{
  console.log(`Promises`);
  mongoose.connection.close();
}).catch(() => {
  console.log(` :( `)
})

