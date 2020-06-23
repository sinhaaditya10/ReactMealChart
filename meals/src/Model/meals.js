const Sequelize= require('sequelize');
const db= require('../Connection/DBConnection');

const meal= db.define('meal',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    photoURL: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.INTEGER
    },
    ingredients: {
        type: Sequelize.STRING
    }
});
module.exports= meal;