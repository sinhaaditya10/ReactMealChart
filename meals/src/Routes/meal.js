const express= require('express');
const router= express.Router();
const db= require('../Connection/DBConnection');
const model= require('../Model/meals');
const meal = require('../Model/meals');
const Sequelize= require('sequelize');
const Op = Sequelize.Op;


//Select all
router.get('/', (req,res) => {
    model.findAll()
    .then(meals => {
        console.log(meals);
        //res.sendStatus(200);
        res.send(JSON.stringify(meals));
    })
    .catch(err => console.log(err));
});

//Add a meal
router.get('/add', (req, res) => {
    const data= {
        id: 6,
        name: "Chicken Burger",
        category: "Burger",
        photoURL: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190416-chicken-burger-082-1556204252.jpg?crop=1xw:1xh;center,top&resize=768:*",
        calories: 283,
        ingredients: "1 1/2 lb. ground chicken, 3/4 tsp. smoked paprika, 1 clove garlic, minced, 3 green onions, minced, Kosher salt, Freshly ground black pepper, 2 tbsp. extra-virgin olive oil, 4 slices cheddar, 4 leaves butterhead lettuce, 2 c. coleslaw, 1 avocado, thinly sliced, 1/4 small red onion, thinly sliced, 1 jalapeño, thinly sliced, 4 brioche burger buns, split and lightly toasted"
    }
    let { id, name, category, photoURL, calories, ingredients } = data;
    //Insert into table

    meal.create({
        id,
        name,
        category,
        photoURL,
        calories,
        ingredients
    }).then(meals => res.redirect('/meals')).catch(err => console.log(err));
});
//Select all where category matches with query
router.get('/:query', (req, res) => {
    var query = req.params.query;
    model.findAll({
        where: {
            [Op.or]: {
                category: {
                    [Op.like]: `%${query}%`
                },
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        }
    })
    .then(meals => {
        res.send(meals);
    })
    .catch(err => console.log(err));
});
module.exports= router;