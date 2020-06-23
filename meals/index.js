const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const db= require('./src/Connection/DBConnection');
const cors= require('cors');
const PORT= process.env.PORT || 5000;
app.use(cors());
app.get('/', (req,res) => res.send('INDEX'));

//Test DB
db.authenticate().then(() => console.log('Database Connected...'))
.catch(err => console.log('Error '+err));

//Meal routes
app.use('/meals', require('./src/Routes/meal'));
app.listen(PORT, console.log(`Server started on port ${PORT}`));
