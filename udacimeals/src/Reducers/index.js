import { UPDATE_MEAL, CLEAR_MEAL, SELECT_RECIPE } from '../Actions'
import { combineReducers } from 'redux';
const initialStore= {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null
    }
}
function food(state={}, action)
{
    switch(action.type)
    {
        case UPDATE_MEAL:
                const {Meal}= action
                return{
                    ...state,
                    [Meal.name]: Meal
                }
                default:
                    return state;
    }
}
function ingredient(state={}, action)
{
    switch(action.type)
    {
        case SELECT_RECIPE: 
        let {ingredients}= action.Meal;
        ingredients= ingredients.split(',');
            return{
                ...state,
                ingredients: ingredients
            }     
        default: 
            return state;
    }
}
function calendar(state= initialStore, action)
{
    const {Meal, day, meal}= action
    switch(action.type)
    {
        case UPDATE_MEAL: 
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: Meal.name
                }
            }
        
        case CLEAR_MEAL:
            return {
                ...state,
                [day]: {
                    ...state[day],
                     [meal]: null
                }
            }

        default:
            return state;
    }
}
export default combineReducers({food,calendar,ingredient});